import { useMediaURL } from "@/modules/core/media/shared/lib";

type Options = {
	id: string;
	defaultValue?: string | null;
};
export const useCustomIcon = ({ id, defaultValue }: Options) => {
	return useMediaURL(id) ?? defaultValue;
};
