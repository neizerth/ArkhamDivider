export const setInputCursorAtTheEnd = <T extends Element>(input: T) => {
	// Move cursor to end of contentEditable
	const range = document.createRange();
	const sel = window.getSelection();
	range.selectNodeContents(input);
	range.collapse(false);

	if (!sel) {
		return;
	}

	sel.removeAllRanges();
	sel.addRange(range);
};
