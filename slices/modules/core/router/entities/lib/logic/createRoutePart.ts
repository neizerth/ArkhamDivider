export const createRoutePart = (value?: string | null) => {
	return value ? `/${value}` : "";
};
