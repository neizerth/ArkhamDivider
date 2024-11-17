import { Mapping } from "./util";

export type I18NLanguageBundle = Mapping<string>;

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
