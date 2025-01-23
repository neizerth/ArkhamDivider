import { ARKHAMESQUE_URL } from "@/shared/config/app";
import { IArkhamesqueBuild } from "arkhamesque-classic-divider-data";

export const fetchData = <T>(path: string) => <T>fetch(ARKHAMESQUE_URL+path).then(r => r.json())

export const fetchArkhamesqueData = () => fetchData<IArkhamesqueBuild>('/data.json');