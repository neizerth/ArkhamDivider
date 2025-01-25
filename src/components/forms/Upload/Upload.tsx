import { PropsWithClassName } from "@/shared/types/util";
import S from "./Upload.module.scss";
import classNames from "classnames";
import { PropsWithChildren } from "react";

export type UploadProps = PropsWithClassName &
	PropsWithChildren & {
		multiple?: boolean;
		accept?: string;
		onChange: (files: FileList) => void;
	};

export const Upload = ({
	className,
	children,
	multiple,
	accept,
	onChange,
}: UploadProps) => {
	return (
		<div className={classNames(S.container, className)}>
			<input
				type="file"
				multiple={multiple}
				className={S.input}
				onChange={(e) => e.target.files && onChange(e.target.files)}
				accept={accept}
			/>
			<div className={S.content}>{children}</div>
		</div>
	);
};
