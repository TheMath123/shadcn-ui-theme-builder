import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  ColorDefinition,
  ColorObject,
  hslToHex,
  hexToHSL,
} from "@/utils/color";
import { ChromePicker } from "react-color";
import { TableRow, TableCell } from "./ui/table";
import { toast } from "./ui/use-toast";
import { useColors } from "@/lib/colors";

interface ColorPickerProps {
  color: ColorDefinition;
}

export function ColorPickerRow({ color }: ColorPickerProps) {
  const [colorAtom, setColorAtom] = useColors();
  const [colorHash, setColorHash] = useState(hslToHex(color.color));

  const handleChange = (newColor: string) => {
    setColorHash(newColor);
    if (colorAtom) {
      const isDark = color.id.split("-")[0] as keyof ColorObject;
      const newColorAtom = {
        ...colorAtom,
        [isDark]: colorAtom[isDark].map((item: ColorDefinition) => {
          if (item.id === color.id) {
            return {
              ...item,
              color: hexToHSL(newColor),
            };
          }
          return item;
        }),
      };
      setColorAtom(newColorAtom);
    }
  };

  function formattedColorName(name: string) {
    let rawString = name.replaceAll("--", "");
    const init = rawString.charAt(0).toUpperCase();
    return init + rawString.slice(1);
  }

  return (
    <TableRow>
      <TableCell>
        <Popover>
          <PopoverTrigger>
            <div
              className={cn(
                "w-16 aspect-square border border-border overflow-hidden rounded flex items-center justify-center"
              )}
              style={{
                backgroundColor: colorHash,
              }}
            ></div>
          </PopoverTrigger>

          <PopoverContent>
            <ChromePicker
              color={colorHash}
              onChange={(color) => {
                handleChange(color.hex);
              }}
            />
          </PopoverContent>
        </Popover>
      </TableCell>
      <TableCell>
        <p className="font-semibold w-2xl">{formattedColorName(color.label)}</p>
      </TableCell>
      <TableCell className="font-medium">
        <code
          title="Copy HEX"
          className={cn(
            "p-2 bg-secondary text-secondary-foreground rounded",
            "cursor-pointer transition-all duration-200 ease-in-out",
            "hover:brightness-90 active:brightness-75"
          )}
          onClick={() => {
            navigator.clipboard.writeText(colorHash);
            toast({
              title: "Hash copied",
              description: `Hex code of color ${formattedColorName(
                color.label
              )} copied to clipboard.`,
            });
          }}
        >
          {colorHash}
        </code>
      </TableCell>
    </TableRow>
  );
}
