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
		MuiTabs: {
			styleOverrides: {
				root: {
					".MuiTabs-list": {
						justifyContent: "center",
					},
					"&:has(.MuiTabs-scrollButtons) .MuiTabs-list": {
						justifyContent: "flex-start",
					},
				},
			},
		},
		MuiAutocomplete: {
			styleOverrides: {
				root: {
					".MuiAutocomplete-inputRoot .MuiAutocomplete-input": {
						minWidth: 0,
					},
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				select: {
					colorScheme: "dark",
				},
				root: {
					"&.Mui-selected": {
						backgroundColor: "blue",
					},
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
