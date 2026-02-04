import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListSubheader from "@mui/material/ListSubheader";
import type { TFunction } from "i18next";
import { Row } from "@/shared/ui";
import type { SelectRenderGroupCallback } from "../model";

type RenderGroupProps =
	| {
			selectable?: false;
	  }
	| {
			selectable: true;
			t: TFunction;
			onSelectAll: (group: string) => void;
			onSelectNone: (group: string) => void;
	  };

export const renderGroup =
	(props: RenderGroupProps = {}): SelectRenderGroupCallback =>
	(params) => {
		const group = params.group;

		return (
			<li key={params.key}>
				<ListSubheader
					component="div"
					sx={{
						top: -8,
						display: "flex",
						alignItems: "center",
						gap: 1,
						width: "100%",
					}}
				>
					<Row justifyContent="space-between" flex={1}>
						<span>{group}</span>
						{props.selectable && (
							<Row gap={1} alignItems="center">
								<Button
									onClick={() => props.onSelectAll(group)}
									variant="text"
									color="inherit"
									size="small"
								>
									{props.t("Select All")}
								</Button>
								<Box component="span" sx={{ opacity: 0.7 }}>
									|
								</Box>
								<Button
									onClick={() => props.onSelectNone(group)}
									variant="text"
									color="inherit"
									size="small"
								>
									{props.t("Select None")}
								</Button>
							</Row>
						)}
					</Row>
				</ListSubheader>
				<Box component="ul" padding={0}>
					{params.children}
				</Box>
			</li>
		);
	};
