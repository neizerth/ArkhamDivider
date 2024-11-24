import { ARKHAMESQUE_URL } from "@/constants/app";
import { identity } from "ramda";

export const getDividerImage = (data: (string | undefined | false)[]) => {
  const path = data.filter(identity).join('');
  return `${ARKHAMESQUE_URL}/images/${path}.jpg`
}
