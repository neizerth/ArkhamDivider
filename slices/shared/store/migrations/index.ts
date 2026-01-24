import type { MigrationManifest } from "redux-persist";
import setDefaultDPI from "./2026-01-24T12-18-28-set-default-dpi";

const migrations = [setDefaultDPI];

export const migrationManifest: MigrationManifest = migrations.reduce(
	(acc, migration, index) => {
		acc[index + 1] = migration;
		return acc;
	},
	{} as MigrationManifest,
);

export const currentMigrationVersion = 1;
