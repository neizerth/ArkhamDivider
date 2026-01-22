export const frontPageStyles = {
	boxShadow: "0 0 2px rgba(0, 0, 0, 0.2)",
	"&:hover": {
		boxShadow: "0 0 2px rgba(0, 0, 0, 0.4)",
	},
};

export const backPageStyles = {
	backgroundColor: "#f3f3f3",
	boxShadow: "0 0 2px rgba(0, 0, 0, 0.2), inset 0 0 20px rgba(0, 0, 0, 0.1)",
	"&:hover": {
		boxShadow: "0 0 2px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(0, 0, 0, 0.2)",
	},
};

export const pageSideStyles = {
	front: frontPageStyles,
	back: backPageStyles,
};
