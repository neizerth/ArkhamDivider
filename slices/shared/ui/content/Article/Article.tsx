import Box, { type BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export type ArticleProps = BoxProps;

export const Article = styled((props: ArticleProps) => <Box {...props} />)(
	({ theme }) => ({
		color: "inherit",
		lineHeight: 1.6,
		overflowWrap: "anywhere",

		"& h2": {
			marginBlock: theme.spacing(3),
			...theme.typography.h5,
		},
		"& h3": {
			marginBlock: theme.spacing(2.5),
			...theme.typography.h6,
		},
		"& h4": {
			marginBlock: theme.spacing(2),
			...theme.typography.subtitle1,
			fontWeight: theme.typography.fontWeightMedium,
		},
		"& p": {
			marginBlock: theme.spacing(1.5),
			...theme.typography.body1,
		},

		"& a": {
			color: theme.palette.primary.main,
			textDecoration: "underline",
			textUnderlineOffset: "0.15em",
		},
		"& a:hover": {
			textDecorationThickness: "2px",
		},

		"& ul, & ol": {
			marginBlock: theme.spacing(1.5),
			paddingInlineStart: theme.spacing(3),
		},
		"& li": {
			...theme.typography.body1,
		},
		"& li + li": {
			marginBlockStart: theme.spacing(0.75),
		},

		"& hr": {
			border: 0,
			borderTop: `1px solid ${theme.palette.divider}`,
			marginBlock: theme.spacing(3),
		},

		"& blockquote": {
			margin: 0,
			marginBlock: theme.spacing(2),
			paddingInlineStart: theme.spacing(2),
			borderInlineStart: `3px solid ${theme.palette.divider}`,
			color: theme.palette.text.secondary,
		},

		"& code": {
			fontFamily:
				'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
			fontSize: "0.95em",
			background: theme.palette.action.hover,
			paddingInline: theme.spacing(0.5),
			paddingBlock: theme.spacing(0.25),
			borderRadius: theme.shape.borderRadius,
		},
		"& pre": {
			marginBlock: theme.spacing(2),
			padding: theme.spacing(2),
			borderRadius: theme.shape.borderRadius,
			background: theme.palette.action.hover,
			overflow: "auto",
		},
		"& pre code": {
			background: "transparent",
			padding: 0,
		},

		"& table": {
			width: "100%",
			borderCollapse: "collapse",
			marginBlock: theme.spacing(2),
		},
		"& th, & td": {
			border: `1px solid ${theme.palette.divider}`,
			padding: theme.spacing(1),
			textAlign: "left",
			verticalAlign: "top",
		},
		"& th": {
			background: theme.palette.action.hover,
			fontWeight: theme.typography.fontWeightMedium,
		},
		"& img": {
			maxWidth: "100%",
			height: "auto",
		},
		a: {
			color: theme.palette.primary.dark,
		},
	}),
);
