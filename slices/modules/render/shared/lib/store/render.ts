import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { RenderStatus, RenderType } from "../../model";

export type RenderState = {
	hideTextNodes: boolean;
	hideIconNodes: boolean;
	dividerRenderId: string | null;
	renderType: RenderType | null;
	renderProgress: number | null;
	renderProgressTotal: number | null;
	renderStatus: RenderStatus;
	renderStatusMessage: string | null;
};

const initialState: RenderState = {
	hideTextNodes: false,
	hideIconNodes: false,
	dividerRenderId: null,
	renderType: null,
	renderProgress: null,
	renderProgressTotal: null,
	renderStatus: "idle",
	renderStatusMessage: null,
};

const state = createSliceState(initialState);

type StartRenderPayload = {
	message?: string;
	total?: number;
	value?: number;
	dividerId?: string;
	renderType?: RenderType;
};

export const render = createSlice({
	name: "render",
	...state,
	reducers: {
		...state.reducers,
		startRender(state, action: PayloadAction<StartRenderPayload>) {
			const {
				message = null,
				total = null,
				value = 0,
				dividerId = null,
				renderType = null,
			} = action.payload;
			state.renderType = renderType;
			state.renderStatus = "pending";
			state.renderStatusMessage = message;
			state.renderProgress = value;
			state.renderProgressTotal = total;
			state.dividerRenderId = dividerId;
		},
		finishRender(state) {
			state.renderStatus = "idle";
			state.renderStatusMessage = null;
			state.renderProgress = null;
			state.renderProgressTotal = null;
			state.dividerRenderId = null;
			state.hideTextNodes = false;
			state.hideIconNodes = false;
			state.renderType = null;
		},
		errorRender(state, action: PayloadAction<string>) {
			state.renderStatus = "error";
			state.renderStatusMessage = action.payload;
		},
	},
});

export const {
	setDividerRenderId,
	setHideTextNodes,
	setHideIconNodes,
	setRenderProgress,
	setRenderProgressTotal,
	setRenderStatus,
	setRenderStatusMessage,
	startRender,
	finishRender,
	errorRender,
} = render.actions;

export const {
	selectDividerRenderId,
	selectHideTextNodes,
	selectHideIconNodes,
	selectRenderProgress,
	selectRenderProgressTotal,
	selectRenderStatusMessage,
	selectRenderStatus,
} = render.selectors;

export default render.reducer;
