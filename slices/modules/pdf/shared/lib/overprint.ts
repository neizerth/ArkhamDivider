import {
	PDFDict,
	PDFName,
	type PDFPage,
	popGraphicsState,
	pushGraphicsState,
	setGraphicsState,
} from "pdf-lib";

export const enableOverprint = (page: PDFPage) => {
	const pdfDoc = page.doc;
	const stateName = "GS_OverprintOn";
	const extStateName = "ExtGState";

	const resources = page.node.Resources();

	if (!resources) {
		return;
	}

	// 1. Создаем или получаем словарь ресурсов ExtGState
	if (!resources.has(PDFName.of(extStateName))) {
		resources.set(PDFName.of(extStateName), pdfDoc.context.obj({}));
	}
	const extGState = resources?.lookup(PDFName.of(extStateName), PDFDict);

	if (!extGState) {
		return;
	}

	// 2. Добавляем настройку оверпринта, если её еще нет
	if (!extGState.has(PDFName.of(stateName))) {
		const overprintDict = pdfDoc.context.obj({
			Type: extStateName,
			OP: true, // Overprint для заливки
			op: true, // Overprint для обводки
			OPM: 1, // Режим иллюстратора (Overprint Mode)
		});
		extGState.set(PDFName.of(stateName), overprintDict);
	}

	// 3. Применяем состояние на странице
	page.pushOperators(pushGraphicsState(), setGraphicsState(stateName));
};

export const disableOverprint = (page: PDFPage) => {
	page.pushOperators(popGraphicsState());
};
