import { ColorObject } from "@/utils/color";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const colorsAtom = atomWithStorage<ColorObject | null>("colors", null);

export const useColors = () => {
  return useAtom(colorsAtom);
};
