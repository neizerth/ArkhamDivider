import { createTheme } from "@mui/material/styles";

declare module "@mui/material/Button" {
	interface ButtonGroupPropsColorOverrides {
		dashed: true;
	}
}

const palette = {
	primary: {
		main: "rgb(255, 205, 72)",
		dark: "rgb(202, 147, 8)",
		light: "rgb(255, 233, 173)",
	},
};

export const theme = createTheme({
	palette,
	typography: {},
	components: {
		MuiSelect: {
			styleOverrides: {
				select: {
					colorScheme: "dark",
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: palette.primary.dark,
					},
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					"&.Mui-focused": {
						color: palette.primary.dark,
					},
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					"&.Mui-selected": {
						backgroundColor: palette.primary.light,
					},
				},
			},
		},
	},
});
