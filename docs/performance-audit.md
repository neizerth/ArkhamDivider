# Аудит производительности

Дата: 2026-08-14 · Ветка: `perf-storage` · Коммит: `74d7e692`

Изначально аудит был статическим: чтение кода + замеры собранного бандла и реального payload
данных. По ходу работы над P0-1 и P0-2 добавились замеры в браузере — они отмечены в
соответствующих разделах. Там, где цифры остались оценочными, это указано явно.

Разделы с пометкой ✅ уже исправлены, в них приведены замеры «до/после».

---

## Резюме

| # | Проблема | Область | Приоритет |
|---|---|---|---|
| P0-1 | `redux-persist` пишет ~1 MB в `localStorage` синхронно на каждый dispatch — и при этом персист умирал на старте, данные пользователя не сохранялись | storage | Критично ✅ сделано |
| P0-2 | Единый `vendor`-чанк 3.0 MB / 887 KB gzip блокирует первый рендер | bundle | Критично ✅ сделано |
| P0-3 | Экспорт даёт O(N²) ре-рендеров: `setDividerRenderId` + `setRenderProgress` на каждый разделитель | render | Критично |
| P1-1 | `useBoundingRect` создаёт `ResizeObserver` + `getBoundingClientRect` на каждый `DividerView` | runtime | Высокий |
| P1-2 | Практически нет мемоизации компонентов (`memo` — 2 вхождения на 1737 файлов) | runtime | Высокий |
| P1-3 | `PrintablePage` не мемоизирован и получает новый `pageProps` каждый рендер | runtime | Высокий |
| P1-4 | Нет виртуализации страниц печати — весь тираж в DOM одновременно | runtime | Высокий |
| P1-5 | `use-fit-text` на каждом текстовом узле разделителя (7–8 на разделитель) | runtime | Высокий |
| P2-1 | Шрифты 34 MB в TTF/OTF, без `woff2`, `font-display`, `unicode-range` | assets | Средний |
| P2-2 | Фоны разделителей 25 MB, часть в JPG/PNG до 1.5 MB на файл | assets | Средний |
| P2-3 | `Cache-Control` задан только для `/assets/`; `/fonts/` и `/images/` (59 MB) без него | hosting | Средний |
| P2-4 | Селекторы-фабрики с кэшем размера 1 при N разделителей — постоянный промах | store | Средний |
| P2-5 | Все 10 языков i18n вшиты в основной бандл | bundle | Средний |
| P3-1 | `loader.gif` 324 KB на первом экране | assets | Низкий |
| P3-2 | `AppLoadProvider` блокирует весь UI до ответа `core.json` (838 KB) | startup | Низкий |
| P3-3 | `fast-memoize` без ограничения кэша | runtime | Низкий |

---

## P0-1. `redux-persist` пишет ~1 MB в `localStorage` на каждый dispatch ✅ сделано

**Где:** [store.ts:35](slices/shared/store/store.ts:35)

```ts
const persistConfig = {
	key: "root",
	storage,                       // redux-persist/lib/storage → localStorage
	migrate: createMigrate(migrationManifest, { debug: false }),
	version: currentMigrationVersion,
	blacklist: ["story", "arkhamesqueClassic", "arkhamIndex"],
};
```

`throttle` не задан → по умолчанию `0`. Каждое изменение любого persist-слайса ставит запись в
очередь на следующий тик, и `writeStagedState` вызывает `localStorage.setItem("persist:root", …)`
со **всем** объектом, а не только изменившимся ключом.

Что реально лежит в persist. Замеры по боевому `core.json`
(`https://neizerth.github.io/ArkhamDividerData/core.json`, всего 838 KB):

| Слайс | Размер JSON | Персистится? | Нужно ли |
|---|---|---|---|
| `stories` | **366 KB** (108 записей) | да | нет — приходит с сервера при каждом старте |
| `encounterSet` | **250 KB** (779 записей) | да | нет — то же |
| `icons` | **267 KB** (2012 записей) | да | нет — то же |
| `dividers` | зависит от тиража | да | **да**, это данные пользователя |
| `render` | байты | да | нет — прогресс экспорта, транзиентное состояние |
| `router` | байты | да | нет — дублирует URL |
| `divider`, `print`, `i18n`, `app` | байты | да | да |

Замер в браузере (dev, Chrome): одна запись — **1005 KB и 4–12 мс** синхронной блокировки
главного потока. Оценка 880 KB оказалась занижена: JSON экранирует уже сериализованные строки
слайсов, добавляя сверху.

Отдельно: в `blacklist` указан `story` — слайс из одного поля `storyCode`
([story.ts](slices/modules/story/shared/lib/store/story.ts)). Большая коллекция называется
`stories` ([stories.ts](slices/modules/story/shared/lib/store/stories.ts)) и в blacklist **не
попала**. Похоже на опечатку: намерение явно было не персистить серверные данные.

Дополнительный риск: квота `localStorage` — обычно 5 MB. ~1 MB серверных данных + тираж
разделителей подводят к ней вплотную; при переполнении `setItem` бросает `QuotaExceededError`.

### Попутно найден баг: персист умирал сразу после старта

При проверке в браузере выяснилось, что до правок пользовательские разделители **не сохранялись
вообще**. Причина — в [injectReducer.ts](slices/shared/store/injectReducer.ts):

```ts
store.replaceReducer(persistReducer(persistConfig, buildRootReducer()));
```

`persistReducer` держит `_persistoid` и `_paused` в замыкании конкретного экземпляра и
инициализирует их **только** по экшену `PERSIST`, который `persistStore` шлёт один раз при старте.
Новый экземпляр из `replaceReducer` его не видит: `_persistoid === null`, `_paused === true`,
и `conditionalUpdate` молча перестаёт писать до конца сессии.

`DividerProvider` смонтирован глобально в [App.tsx](slices/modules/core/app/app/ui/App/App.tsx)
и на каждом старте инжектит `arkhamesqueClassic` и `arkhamIndex` — то есть персист умирал на
любой странице сразу после загрузки. В хранилище оставалась только boot-запись серверного кэша:
худший возможный расклад — 1 MB чужих данных сохраняется, данные пользователя нет.

Проверено A/B: стор `previewZoom = 77`, хранилище `100`, записей ноль.

### Статус: сделано

[store.ts](slices/shared/store/store.ts), [injectReducer.ts](slices/shared/store/injectReducer.ts)

1. `blacklist` → явный `whitelist`. Из персиста ушли `router` (пересинхронизируется из роутера
   на маунте), `render` (транзиентный прогресс экспорта) и `story`. Серверный кэш
   (`stories`/`icons`/`encounterSet`) оставлен намеренно: на нём держится быстрый старт через
   `selectAppDataLoaded` → `loadCoreDataSaga`.
2. `throttle: 1000`. Нюанс реализации: redux-persist разбирает **один** ключ из очереди за тик
   интервала и пишет только когда очередь опустела, поэтому задержка = `throttle × изменённых
   ключей`.
3. `persistor.flush()` на `pagehide` и `visibilitychange → hidden` — страховка от потери
   последних изменений в окне throttle.
4. `persistor.persist()` после `replaceReducer` в `injectReducer` — чинит баг выше.
5. Удалён `clearRenderingOnStartSaga` — сага на `take(REHYDRATE)`, существовавшая только чтобы
   гасить залипший `renderStatus: "pending"` после перезагрузки. С непересистящимся `render`
   стала no-op.

Проверка в браузере после правок:

| Что | Результат |
|---|---|
| Ключи в `persist:root` | `app, icons, i18n, print, divider, dividers, stories, encounterSet` — `router`/`render`/`story` ушли |
| Генерация 63 разделителей | 63 в сторе → **63 в хранилище**, **1 запись** на всю генерацию |
| Перезагрузка страницы | 63 разделителя восстановлены и отрисованы |
| Непрерывный поток dispatch'ей | ~1 запись в секунду вместо одной на ~4 мс |

**Осталось на будущее:** перенос серверного кэша на `localforage` (уже в зависимостях,
используется в [mediaStore.ts](slices/modules/core/media/shared/config/mediaStore.ts)) — IndexedDB
асинхронен и убрал бы оставшийся 1 MB с главного потока совсем. Решено пока не делать, чтобы не
трогать поведение быстрого старта.

---

## P0-2. Единый `vendor`-чанк 3.0 MB / 887 KB gzip ✅ сделано

**Где:** [vite.config.ts:92](vite.config.ts:92)

```ts
manualChunks(id) {
	if (!id.includes("node_modules")) {
		return;
	}
	return "vendor";
}
```

Замеры по `dist/`:

| Файл | raw | gzip |
|---|---|---|
| `vendor-DyNNMeyM.js` | 3 136 731 | 907 866 |
| `index-Dx_40jsv.js` (entry) | 205 476 | 64 489 |
| `vendor-Dc9mW-yq.css` | 35 814 | 16 336 |
| **Итого initial** | **3.34 MB** | **~964 KB** |

Проблема не в количестве, а в том, что правило **отменяет уже сделанное разделение кода**.
В проекте корректно расставлены динамические импорты — маршруты
([router.tsx](slices/modules/core/router/app/config/router.tsx)), 14 типов разделителей
([items/index.ts](slices/modules/divider/entities/items/index.ts)), pdfkit
([downloadDividersAsPDFSaga.tsx:61](slices/modules/render/features/download-dividers-as-pdf/downloadDividersAsPDFSaga.tsx:61)),
`svg-to-pdfkit`, `wasm-vips`. Но их вендорные зависимости всё равно попадают в общий `vendor`,
который является initial-чанком.

Проверка содержимого собранного `vendor`: найдены `pdfkit`, `PDFDocument`, `modern-screenshot`,
`piexif`, `qrcode`, `react-markdown`, `micromark`, `localforage`. Всё это нужно только при
экспорте, печати или на статических страницах — но грузится каждому посетителю до первого пикселя.

Комментарий в конфиге объясняет причину («circular chunk dependencies react-vendor <-> mui-vendor»)
— это реальная проблема ручного дробления по библиотекам, но решается она не схлопыванием всего
в один чанк.

### Статус: сделано

[vite.config.ts](vite.config.ts) — `manualChunks` убран целиком. Rollup раскладывает чанки по
графу динамических импортов сам, дробить вручную не понадобилось.

Замер двух сборок одного коммита (initial payload = entry + `modulepreload` + CSS из `index.html`):

| | было | стало | Δ |
|---|---|---|---|
| initial raw | 3305 KB | 1066 KB | **−68 %** |
| initial gzip | **967 KB** | **351 KB** | **−64 %** |
| чанков всего | 87 | 94 | +7 |

`pdfkit` (1454 KB / 413 KB gzip) выехал в отдельный чанк и грузится только при экспорте в PDF.
Из initial-чанка полностью ушли `pdfkit`, `qrcode`, `micromark`/`react-markdown`.

Опасение из старого комментария («circular chunk dependencies») не подтвердилось: проверены все
524 межчанковых импорта в 94 чанках — битых нет. Единственное совпадение,
`x("./dictionary.bin.js")` в чанке pdfkit, — внутренний browserify-резолвер самой библиотеки,
присутствует и в старом `vendor`.

Проверка production-сборки в браузере: страница раскладки открывается, генерация 63 разделителей
догружает 16 чанков по требованию, ошибок нет, `pdfkit` среди догруженных отсутствует.

### Осталось: barrel-утечка тянет три библиотеки в initial-чанк

В initial-чанке остались `modern-screenshot`, `piexifjs` и `localforage` (~200 KB raw суммарно
по исходникам пакетов). Причина не в чанковании, а в бочке
[render/shared/lib/index.ts](slices/modules/render/shared/lib/index.ts):

```ts
export * from "./logic";
export * from "./node";   // ← renderDivider → modern-screenshot
export * from "./store";
export * from "./vips";
```

`DividerView`, `DividerText` и `DividerIcon` импортируют из этой бочки всего лишь селекторы
(`selectDividerRenderId`, `selectHideTextNodes`), но `export * from "./node"` притягивает
`renderDivider` со всем `modern-screenshot`, а `./logic` — `setJPEGResolution` с `piexifjs`.

Лечится импортом из подпути (`@/modules/render/shared/lib/store`) в этих трёх компонентах либо
разделением бочки на «лёгкую» и «тяжёлую» части. `localforage` приходит аналогично через
[mediaStore.ts](slices/modules/core/media/shared/config/mediaStore.ts).

---

## P0-3. Экспорт: O(N²) ре-рендеров

**Где:** [downloadDividersAsImagesSaga.ts:164](slices/modules/render/features/download-dividers-as-images/downloadDividersAsImages/downloadDividersAsImagesSaga.ts:164)

Цикл экспорта на каждый разделитель делает:

```ts
yield put(setDividerRenderId(divider.id));   // ①
const contents = yield call(renderDivider, options);
progress++;
yield put(setRenderProgress(progress));      // ②
```

`selectDividerRenderId` подписан минимум в двух компонентах, отрисованных для **каждого**
разделителя:

- [DividerView.tsx:34](slices/modules/divider/entities/ui/view/DividerView/DividerView.tsx:34) — `const renderId = useAppSelector(selectDividerRenderId)`
- [DividerText.tsx:45](slices/modules/divider/entities/ui/view/DividerText/DividerText.tsx:45) — то же, а `DividerText` встречается 7–8 раз на разделитель

`memo` на `DividerViewMemo` здесь не спасает: значение селектора меняется, подписка срабатывает
у всех экземпляров. При тираже N получаем N дispatch'ей × N подписчиков = **O(N²)** ре-рендеров.
Для 300 разделителей это ~90 000 рендеров компонентов за экспорт, плюс столько же по `DividerText`.

Сверху накладывается P0-1: `render` персистится, поэтому ② пишет ~880 KB в `localStorage` на
**каждый** обработанный разделитель. Для 300 разделителей — 600 dispatch'ей и 600 блокирующих
записей.

**Что делать**

1. Исключить `render` из persist (см. P0-1) — снимает записи в хранилище.
2. Прогресс отдавать через throttle: копить значение и отправлять раз в ~200 мс либо каждые
   N элементов, а не на каждый.
3. Убрать глобальную подписку на `renderId` из per-divider компонентов. Варианты:
   - селектор, возвращающий булев флаг для конкретного id: `selectIsDividerRendering(id)` —
     тогда меняется значение только у двух разделителей (предыдущего и текущего);
   - вынести `renderId` из redux в React context / внешний store с точечной подпиской.

Пункт 3 снимает квадратичность и является главным здесь.

---

## P1-1. `ResizeObserver` на каждый `DividerView`

**Где:** [useBoundingRect.ts](slices/shared/lib/hooks/ui/useBoundingRect.ts)

```ts
const setBoundingRect = () => setRect(node.getBoundingClientRect());
setBoundingRect();
const observer = new ResizeObserver(setBoundingRect);
observer.observe(node);
```

Три проблемы:

1. **Один observer на элемент.** `DividerView` вызывает хук
   ([DividerView.tsx:35](slices/modules/divider/entities/ui/view/DividerView/DividerView.tsx:35)),
   значит при тираже 300 — 300 наблюдателей. Плюс `useDividerObject`
   ([useDividerObject.ts:26](slices/modules/divider/entities/lib/hooks/useDividerObject.ts:26))
   и `useVirtualizedIconGroups`.
2. **`getBoundingClientRect()` внутри колбэка** — принудительный layout. `ResizeObserver`
   вызывает колбэки пачкой, каждый форсит layout → layout thrashing. Причём нужная информация
   (`contentRect`) уже приходит в аргументе `entries` и её чтение бесплатно.
3. **Новый `DOMRect` каждый раз** → новая идентичность в state → ре-рендер даже при неизменных
   размерах. При изменении зума превью все 300 наблюдателей срабатывают одновременно, каждый
   вызывает `setState`.

Дополнительно: `DividerView` возвращает поддерево только при `rect !== null`
([DividerView.tsx:69](slices/modules/divider/entities/ui/view/DividerView/DividerView.tsx:69)),
то есть каждый разделитель гарантированно рендерится дважды при монтировании.

**Что делать**

- Читать `entry.contentRect` вместо `getBoundingClientRect()`.
- Сравнивать с предыдущим значением и не вызывать `setState` при совпадении width/height.
- Один общий `ResizeObserver` на всё приложение с `Map<Element, callback>` вместо одного на элемент.
- Батчить колбэки через `requestAnimationFrame`.

---

## P1-2. Мемоизация компонентов практически отсутствует

Замеры по `slices/`:

| Паттерн | Вхождений |
|---|---|
| `useAppSelector` / `useSelector` | 255 |
| `useCallback` | 168 |
| `useMemo` | 78 |
| `memo(` | **2** |
| `memo(` внутри `entities/items/**` (14 типов разделителей) | **0** |

Ни один компонент разделителя не мемоизирован, при этом каждый подписан на несколько селекторов:
`arkham-index` — 15 вызовов `useAppSelector`, `sarnetsky` — 11, `classic` — 6. Любое изменение
общего состояния (зум, отступы, формат страницы) прокатывается по всему дереву заново.

**Что делать**

Обернуть `memo` корневые компоненты типов разделителей в
[items/index.ts](slices/modules/divider/entities/items/index.ts) и листовые презентационные
компоненты. Перед этим проверить, что пропсы стабильны (см. P1-3) — иначе `memo` бесполезен.

---

## P1-3. `PrintablePage` получает новые пропсы каждый рендер

**Где:** [PrintableContent.tsx:54](slices/modules/print/widgets/ui/PrintableContent/PrintableContent.tsx:54)

```ts
const pageSize = getPageSize({ … });      // новый объект каждый рендер

const pageProps = {                        // новый объект каждый рендер
	pageFormat, showSide: doubleSided, Component: DividerView,
	singleItemPerPage, previewZoom, cropmarksEnabled,
	bleed, bleedEnabled, pageSize, enablePageCounter, pageMargin,
};

{pageLayouts.map((pageLayout) => (
	<PrintablePage {...pageProps} key={…} pageLayout={pageLayout} />
))}
```

`PrintableContent` подписан на 12 селекторов. Срабатывание любого пересоздаёт `pageSize` и
`pageProps`, что заставляет перерисоваться все `PrintablePage` (не мемоизирован), а через них —
все `DividerViewMemo` (`pageSize` приходит новым объектом, shallow-сравнение `memo` не проходит).

Внутри `PrintablePage` на каждый рендер дополнительно создаются `contentSx`, `pageCreditsSx`,
`contentSx`, и вызывается `getGridCropmarks` в двойном цикле по строкам и колонкам сетки.

**Что делать**

- `useMemo` для `pageSize` и `pageProps`.
- `memo` на `PrintablePage`.
- Вынести статические части `sx` за пределы компонента (константы модуля).

---

## P1-4. Нет виртуализации страниц печати

Все страницы тиража рендерятся одновременно
([PrintableContent.tsx:131](slices/modules/print/widgets/ui/PrintableContent/PrintableContent.tsx:131)).
При 9 разделителях на страницу и тираже 300 это 33 страницы × полное дерево разделителя
(фон-`<img>`, 7–8 текстовых узлов с `use-fit-text`, иконки) в DOM одновременно.

Компонент `Debounce` ([Debounce.tsx](slices/shared/ui/behavior/Debounce/Debounce.tsx)) с задержкой
200 мс задерживает первую отрисовку, но не уменьшает её объём.

`@tanstack/react-virtual` уже в зависимостях и используется в модалке выбора иконок
([useVirtualizedIconGroups.ts](slices/modules/core/icon/widgets/ui/IconSelectionModal/lib/hooks/useVirtualizedIconGroups.ts)).

**Что делать**

Виртуализировать список страниц для экранного просмотра, с полным рендером при `@media print`
и при экспорте (капчур `modern-screenshot` требует элемент в DOM). Это самое трудоёмкое из
предложений, но и самое результативное для больших тиражей.

---

## P1-5. `use-fit-text` на каждом текстовом узле

**Где:** [FitInput.tsx:23](slices/shared/ui/control/FitInput/FitInput.tsx:23)

`use-fit-text` подбирает размер шрифта бинарным поиском, каждая итерация — ре-рендер плюс
измерение через `ResizeObserver`. `DividerText` встречается 7–8 раз на разделитель
(sarnetsky — 8, classic — 7; всего 81 вхождение по всем типам).

Сверху [useRemeasureOnFontsLoaded.ts](slices/shared/ui/control/FitInput/useRemeasureOnFontsLoaded.ts)
подписывается на события `document.fonts` и намеренно «дёргает» layout через `paddingRight`, чтобы
спровоцировать пересчёт. При загрузке любого шрифта это срабатывает на всех текстовых узлах
тиража одновременно — то есть сотни принудительных reflow подряд.

Смягчается P1-4 (виртуализацией): узлов за пределами вьюпорта просто не будет.

Также стоит проверить, нужен ли `fit` там, где ширина контейнера фиксирована — часть узлов может
обойтись CSS без измерений.

---

## P2-1. Шрифты: 34 MB, неоптимальные форматы

`public/fonts` — 34 MB в 35 файлах:

| Шрифт | Размер | Формат |
|---|---|---|
| FZLiBian | 13 MB | TTF |
| SanCn | 7.9 MB | TTF |
| ArnoPro | 4.3 MB | OTF |
| STXingkai | 3.8 MB | TTF |
| ArkhamIcons | 1.4 MB | TTF |
| ZhenShuai | 1.3 MB | WOFF |

[createFont.ts](slices/shared/fonts/createFont.ts) генерирует `@font-face` без `font-display`
и, для большинства шрифтов, без `unicode-range`. `main.tsx` импортирует `@/shared/fonts`, что
регистрирует **все** шрифты сразу — включая CJK — независимо от текущего языка
([fonts.ts](slices/shared/fonts/fonts.ts)).

Сама регистрация `@font-face` загрузку не запускает — браузер тянет файл только при
использовании глифа. Но:

- без `font-display: swap` первое использование даёт FOIT — невидимый текст до 3 с;
- при выборе языка ru/en пользователь всё равно рискует зацепить 13 MB CJK-шрифт, если он
  указан в fallback-цепочке любого стиля;
- TTF/OTF без сжатия: перевод в `woff2` типично даёт −40…−70 % (для 13 MB FZLiBian —
  ориентировочно 3–5 MB).

**Что делать**

1. Добавить `font-display: swap` в [createFont.ts](slices/shared/fonts/createFont.ts) —
   однострочное изменение, снимает FOIT.
2. Конвертировать TTF/OTF в `woff2` (в репозитории уже есть `.venv-fonttools` с `pyftsubset` —
   инструментарий на месте).
3. Сабсеттинг CJK по частотным диапазонам через `pyftsubset` + `unicode-range` — основной выигрыш
   именно здесь.
4. Регистрировать языковые группы шрифтов лениво, по текущей локали, а не все сразу.

---

## P2-2. Изображения: 25 MB фонов

`public/images` — 27 MB, из них `divider/background` — 25 MB. Самые тяжёлые файлы:

| Файл | Размер |
|---|---|
| `sarnetsky/horizontal/player/guardian.jpg` | 1.5 MB |
| `sarnetsky/horizontal/player/survivor.jpg` | 1.2 MB |
| `sarnetsky/horizontal/player/rogue.jpg` | 972 KB |
| `sarnetsky-band/background.png` | 748 KB |
| `arkham-deco/scratches.png` | 656 KB |

Часть ассетов уже переведена в AVIF (`render/*.avif`, `binder-bookmark/neutral.avif`), но фоны
sarnetsky и arkham-deco остались в JPG/PNG. Они отдаются в исходном разрешении и масштабируются
CSS — на превью разделитель шириной ~250 px получает картинку в разы больше нужного.

Компонент `Image` ([Image.tsx](slices/shared/ui/content/Image/Image.tsx)) — тонкая обёртка над
`Box component="img"` без `loading="lazy"` и `decoding="async"`. При тираже в сотни разделителей
это сотни `<img>` с синхронным декодированием.

`DividerCategoryPreview` на главной использует `CardMedia` с `image=`
([DividerCategoryPreview.tsx:32](slices/modules/divider/entities/ui/details/divider-category-preview/DividerCategoryPreview/DividerCategoryPreview.tsx:32)) —
это CSS `background-image`, к которому нативный lazy-loading неприменим; все превью категорий
грузятся сразу.

**Что делать**

- Перевести оставшиеся JPG/PNG фоны в AVIF/WebP.
- Отдавать превью-версии (`srcset` / отдельный маленький вариант) для экранного просмотра,
  полное разрешение — только при экспорте.
- Добавить `loading="lazy"` и `decoding="async"` по умолчанию в `Image`. **Осторожно:**
  [waitForDividerCapture.ts:48](slices/modules/render/shared/lib/node/waitForDividerCapture.ts:48)
  ждёт `img.complete` и `img.decode()` перед капчуром — ленивая загрузка не должна ломать этот
  путь. Безопаснее включать её только вне режима экспорта.
- Для `DividerCategoryPreview` заменить `CardMedia image=` на `<img loading="lazy">`.

---

## P2-3. `Cache-Control` только для `/assets/`

**Где:** [vercel.json:39](vercel.json:39)

Иммутабельный заголовок задан для `/assets/(.*)`. Без явного `Cache-Control` остаются:

- `/fonts/**` — 34 MB
- `/images/**` — 27 MB

Оба каталога содержат контент, который меняется редко и всегда по новому пути. При отсутствии
заголовка кэширование определяется дефолтом хостинга (обычно с ревалидацией), то есть повторные
визиты платят как минимум за round-trip на каждый файл.

**Что делать**

Добавить в `headers` правила для `/fonts/(.*)` и `/images/(.*)` с
`public, max-age=31536000, immutable`. При этом ассеты в `public/` версионируются вручную —
менять их нужно с новым именем файла, иначе клиенты застрянут на старой версии. Если такой
дисциплины нет, использовать `max-age=86400, stale-while-revalidate=604800`.

Аналогично для `public/.htaccess` (сборка под Apache/GitHub Pages).

---

## P2-4. Селекторы-фабрики с кэшем размера 1

**Где:** [selectDividerParam.ts](slices/modules/divider/shared/lib/store/selectors/selectDividerParam.ts),
[selectCurrentLayoutParam.ts](slices/modules/divider/shared/lib/store/selectors/selectCurrentLayoutParam.ts)

```ts
export const selectDividerParam =
	<T>({ id, key }: Options) =>
	(state: RootState) =>
		selector(state, id, key) as T | undefined;

const selector = createSelector(
	[selectDividerById, (_: RootState, _id: string, key: string) => key],
	(divider, param) => divider.params?.[param],
);
```

`selector` — один экземпляр на весь модуль с дефолтным `maxSize: 1`. Все разделители и все ключи
ходят через него, поэтому кэш промахивается на каждом вызове с другим `(id, key)`.

Сама вычислительная часть дешёвая (обращение по ключу), так что цена низкая — но мемоизация здесь
не работает вовсе, и при усложнении вычислений это станет проблемой. Тот же паттерн в
`selectCurrentLayoutParam`.

**Что делать**

Задать размер кэша через `createSelector(…, { memoizeOptions: { maxSize: 64 } })` (reselect 5:
`argsMemoizeOptions`), либо создавать селектор на каждый `(id, key)` через `useMemo` на стороне
вызова. Проверить заодно остальные 80 вхождений `createSelector` — есть ли среди них тяжёлые
с тем же паттерном.

---

## P2-5. Все языки i18n в основном бандле

**Где:** [translations/index.ts](slices/modules/core/i18n/shared/config/translations/index.ts)

10 JSON-файлов импортируются статически и попадают в основной чанк. Плюс
[i18n.ts:11](slices/modules/core/i18n/shared/config/i18n.ts:11) дублирует английский в каждый
язык (`{ ...translations.en, ...value }`), что примерно удваивает объём в памяти.

Объём умеренный (en 16 KB, ru 24 KB, остальные ≤4 KB — суммарно ~60 KB), поэтому приоритет
средний. Загружать нужно только текущую локаль + английский как fallback.

---

## P3. Прочее

### P3-1. `loader.gif` 324 KB

[index.html:47](index.html:47) — 324 KB GIF на первом экране, до загрузки JS. Заменить на
inline-SVG-анимацию или CSS-спиннер (единицы килобайт).

### P3-2. `AppLoadProvider` блокирует весь UI

[AppLoadProvider.tsx:14](slices/modules/core/app/app/ui/providers/AppLoadProvider.tsx:14) —
пока не пришёл `core.json` (838 KB), рендерится только `AppLoader`. Статические страницы
(`/about`, `/how-to-print`) не зависят от этих данных и могли бы отрисоваться сразу.

Отдельно: `core.json` отдаётся с GitHub Pages одним запросом. Разделение на `stories` /
`encounterSets` / `icons` позволило бы грузить иконки (267 KB) лениво — они нужны только
при открытии модалки выбора.

### P3-3. `fast-memoize` без ограничения кэша

[size.ts](slices/modules/print/shared/lib/util/size.ts) — 6 функций через `memoize` с
неограниченным кэшем. Кардинальность аргументов низкая (значения DPI), утечки не будет,
но ограничение стоит задать явно.

---

## Порядок работ

Сгруппировано по соотношению «эффект / трудоёмкость».

**Шаг 1 — конфигурация, без изменения логики**

1. ~~`whitelist` вместо `blacklist` + `throttle: 1000` в `persistConfig` (P0-1)~~ — сделано
2. ~~Убрать `manualChunks` (P0-2)~~ — сделано, initial gzip 967 KB → 351 KB
3. `font-display: swap` в `createFont` (P2-1)
4. `Cache-Control` для `/fonts/` и `/images/` (P2-3)

Четыре точечных правки закрывают две критические проблемы из трёх.

**Шаг 2 — локальные правки кода**

5. Throttle прогресса экспорта + точечная подписка на `renderId` (P0-3)
6. `entry.contentRect` + сравнение размеров в `useBoundingRect` (P1-1)
7. `useMemo` для `pageProps`/`pageSize`, `memo` на `PrintablePage` (P1-3)
8. `memo` на компоненты разделителей (P1-2)

**Шаг 3 — крупные задачи**

9. Виртуализация страниц печати (P1-4, снимает заодно часть P1-5)
10. Конвертация шрифтов в `woff2` + сабсеттинг CJK (P2-1)
11. Оптимизация фонов разделителей (P2-2)

---

## Что стоит померить перед работой

Аудит статический. Чтобы подтвердить приоритеты и получить базовые цифры:

- React DevTools Profiler на странице раскладки с тиражом 100+ — подтвердить P1-2/P1-3
- Performance-запись экспорта 50 разделителей — подтвердить P0-3 и цену записи в `localStorage`
- Lighthouse на главной — базовые LCP/TBT до и после шага 1
- `npm run build:explore` — детальная карта того, что попало в initial-чанк
