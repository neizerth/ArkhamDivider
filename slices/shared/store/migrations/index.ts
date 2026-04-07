import type { MigrationManifest } from "redux-persist";
import migrations from "./migrations";

export const currentMigrationVersion = migrations.length;

export const migrationManifest: MigrationManifest = migrations.reduce(
	(acc, migration, index) => {
		acc[index + 1] = migration;
		return acc;
	},
	{} as MigrationManifest,
);
