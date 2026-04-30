export const getArkhamIndexData = () =>
	fetch(`/data/arkham-index.json`).then((res) => res.json());
