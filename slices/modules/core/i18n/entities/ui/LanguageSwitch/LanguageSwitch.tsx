import { equals, reject } from "ramda";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useClickOutside } from "@/shared/lib";
import {
	selectAvailableLanguages,
	selectLanguage,
	setLanguage,
} from "../../../shared/store";
import * as C from "./LanguageSwitch.components";

export function LanguageSwitch() {
	const dispatch = useAppDispatch();
	const language = useSelector(selectLanguage);
	const languages = useSelector(selectAvailableLanguages);

	const [show, setShow] = useState(false);

	const toggleShow = () => {
		setShow(!show);
	};

	const changeLanguage = (lang: string) => {
		if (lang !== language) {
			dispatch(setLanguage(lang));
		}

		setShow(false);
	};
	const close = () => {
		if (!show) {
			return;
		}

		setShow(false);
	};

	const data = [language, ...reject(equals(language), languages)];

	const ref = useClickOutside<HTMLDivElement>(close);

	return (
		<C.Container>
			<C.Content ref={ref}>
				<C.Flag code={language} onClick={toggleShow} />
				{show && (
					<C.DropDown>
						<C.DropDownContent>
							{data.map((lang) => (
								<C.DropDownItem key={lang} onClick={() => changeLanguage(lang)}>
									<C.Flag key={lang} code={lang} />
								</C.DropDownItem>
							))}
						</C.DropDownContent>
					</C.DropDown>
				)}
			</C.Content>
		</C.Container>
	);
}
