import { styled } from "@mui/material/styles";
import { Link as BaseLink } from "@/modules/core/router/entities/ui/Link";

export const Container = styled("nav")`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	gap: ${({ theme }) => theme.spacing(1)};
	font-size: ${({ theme }) => theme.typography.body2.fontSize};
`;

export const Item = styled(BaseLink)`
  color: inherit;
  white-space: nowrap;
`;

export const Link = styled("a")`
  color: inherit;
  white-space: nowrap;
`;
