/**
 * Only dependency-light modules belong in this barrel.
 *
 * Per-divider components (`DividerView`, `DividerText`, `DividerIcon`) import render
 * selectors from here, so anything re-exported lands in the initial chunk. Re-exporting
 * `./node` used to drag in `modern-screenshot`, and `./logic` dragged in `piexifjs`.
 *
 * Heavy modules are imported by their subpath instead — they are only reachable from the
 * export sagas, which live in a lazily loaded chunk:
 *
 *   import { renderDivider } from "@/modules/render/shared/lib/node";
 *   import { getVips } from "@/modules/render/shared/lib/vips";
 *   import { createStreamingDownloadSink } from "@/modules/render/shared/lib/logic/createStreamingDownloadSink";
 */
export * from "./logic/getRenderScale";
export * from "./store";
