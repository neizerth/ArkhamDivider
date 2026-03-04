import type { FontFamily } from "@/shared/model";

export const getClassicLayoutFontFamily = (language: string): FontFamily => {
	switch (language) {
		case "ru":
			return "Conkordia";
		case "cn":
			return "FZLiBian";
		case "ko":
			return "SanCn";
	}
	return "Arkhamic";
};
