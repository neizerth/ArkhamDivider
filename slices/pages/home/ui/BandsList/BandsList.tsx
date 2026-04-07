import { Container, Stack, Typography } from "@mui/material";
import { propEq } from "ramda";
import { useTranslation } from "react-i18next";
import { layoutRoute } from "@/modules/core/router/entities/lib";
import { dividerCategories } from "@/modules/divider/entities/items";
import { Image, Row, SectionTitle } from "@/shared/ui";
import { getBoxSize } from "@/shared/util";
import * as C from "./BandsList.components";

const bandsCategories = dividerCategories.filter(propEq("band", "type"));

export function BandsList() {
	const { t } = useTranslation();
	return (
		<Container>
			<SectionTitle>{t("Bands")}</SectionTitle>
			<Stack gap={2}>
				<Row gap={2} flexWrap="wrap">
					{bandsCategories.map((category) => {
						const [layout] = category.layouts;
						return (
							<Stack gap={1} key={category.id} width="100%">
								<C.Link to={layoutRoute({ layoutId: layout.id })}>
									<Image
										sx={{ width: "100%", backgroundSize: "contain" }}
										src={category.image}
									/>
								</C.Link>
								<Row
									gap={2}
									flexWrap="wrap"
									alignItems="center"
									justifyContent="center"
								>
									<Typography variant="h6" textAlign="center">
										{t(category.name)}
									</Typography>
									{category.groups.map((group) => {
										const [layout] = group.layouts;
										const name = layout.previewName ?? getBoxSize(group.size);
										return (
											<C.Link
												key={group.id}
												to={layoutRoute({ layoutId: layout.id })}
											>
												<C.Chip key={group.id}>
													<Typography variant="body2">{t(name)}</Typography>
												</C.Chip>
											</C.Link>
										);
									})}
								</Row>
							</Stack>
						);
					})}
				</Row>
			</Stack>
		</Container>
	);
}
