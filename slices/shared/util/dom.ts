export const preventDefault = <T extends { preventDefault: () => void }>(
	event: T,
) => {
	event.preventDefault();
};
