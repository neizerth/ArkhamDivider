import { END } from "redux-saga";

export const isChannelEnd = (action: unknown): action is typeof END =>
	action === END;
