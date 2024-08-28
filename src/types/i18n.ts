export type IPOEditorSource = {
    charset: string;
    headers: {
        [index: string]: string;
    }
    translations: {
        [_: string]: {
        [_: string]: {
            msgid: string;
            msgstr: string[]
        }
        }
    }
}
