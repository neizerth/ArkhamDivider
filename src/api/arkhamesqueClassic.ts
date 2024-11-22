import { ARKHAMESQUE_URL } from "@/constants/app";
import { IArkhamesqueBuild } from "arkhamesque-divider-data";

export const fetchData = <T>(path: string) => <T>fetch(ARKHAMESQUE_URL+path).then(r => r.json())

export const fetchArkhamesqueData = () => fetchData<IArkhamesqueBuild>('/data.json');