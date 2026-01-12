import { createAction } from "@reduxjs/toolkit";
import type { Location } from "react-router";

export const changeLocation = createAction<Location>("router/changeLocation");

type LocationChangedPayload = {
	prevLocation: Location | null;
	location: Location;
};

export const locationChanged = createAction<LocationChangedPayload>(
	"router/locationChanged",
);
