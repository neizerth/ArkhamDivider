export type I18NLanguageBundle = {
    [key: string]: string
}

export type IPOEditorTranslation = {
    msgid: string;
    msgstr: string[]
}

export type IPOEditorSource = {
    charset: string;
    headers: {
        [index: string]: string;
    }
    translations: {
        '': {
            [index: string]: IPOEditorTranslation
        }
    }
}
