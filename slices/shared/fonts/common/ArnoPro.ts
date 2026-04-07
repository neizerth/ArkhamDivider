import { createFont } from "../createFont";

export const ArnoPro = createFont({
	family: "Arno Pro",
	src: "/fonts/ArnoPro/ArnoPro-Caption.otf",
});

export const ArnoProBold = createFont({
	family: "Arno Pro",
	src: "/fonts/ArnoPro/ArnoPro-Bold.otf",
	weight: "bold",
});

export const ArnoProBoldItalic = createFont({
	family: "Arno Pro",
	src: "/fonts/ArnoPro/ArnoPro-BoldItalic.otf",
	weight: "bold",
	style: "italic",
});
