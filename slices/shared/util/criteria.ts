export const whereId =
	<T>(id: T) =>
	<U extends { id: T }>(obj: U) =>
		obj.id === id;
