import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { ColorDefinition, hslToHex } from "@/utils/Color";
import { ChromePicker } from "react-color";
import { TableRow, TableCell } from "./ui/table";
import { toast } from "./ui/use-toast";

interface ColorPickerProps {
  color: ColorDefinition;
  onColorChange?: (color: string) => void; // Callback quando a cor é alterada
}

export function ColorPickerRow({ color, onColorChange }: ColorPickerProps) {
  const [colorHash, setColorHash] = useState(hslToHex(color.color));

  const handleChange = (newColor: string) => {
    setColorHash(newColor);
    onColorChange && onColorChange(newColor); // Chama o callback com a nova cor
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
              className={cn("absolute")}
              color={colorHash}
              onChange={(color) => {
                handleChange(color.hex);
              }}
            />
          </PopoverContent>
        </Popover>
      </TableCell>
      <TableCell>
        <p className="font-semibold">{formattedColorName(color.label)}</p>
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
