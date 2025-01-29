import type { PropsWithClassName } from "@/shared/model/types/util";
import classNames from "classnames";
import type { PropsWithChildren } from "react";
import S from "./FileUpload.module.scss";

export type FileUploadProps = PropsWithClassName &
	PropsWithChildren & {
		multiple?: boolean;
		accept?: string;
		onChange: (files: FileList) => void;
	};

export const FileUpload = ({
	className,
	children,
	multiple,
	accept,
	onChange,
}: FileUploadProps) => {
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
