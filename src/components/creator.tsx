"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { ColorObject, parseCssToColorObject } from "@/utils/Color";
import { Button } from "./ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import { ColorPickerRow } from "./color-picker";
import { TableColor } from "./table-color";

const cssThemeStr = `@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 224 71.4% 4.1%;

    --card: 0 0% 100%;
    --card-foreground: 224 71.4% 4.1%;

    --popover: 0 0% 100%;
    --popover-foreground: 224 71.4% 4.1%;

    --primary: 220.9 39.3% 11%;
    --primary-foreground: 210 20% 98%;

    --secondary: 220 14.3% 95.9%;
    --secondary-foreground: 220.9 39.3% 11%;

    --muted: 220 14.3% 95.9%;
    --muted-foreground: 220 8.9% 46.1%;

    --accent: 220 14.3% 95.9%;
    --accent-foreground: 220.9 39.3% 11%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 20% 98%;

    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 224 71.4% 4.1%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 224 71.4% 4.1%;
    --foreground: 210 20% 98%;

    --card: 224 71.4% 4.1%;
    --card-foreground: 210 20% 98%;

    --popover: 224 71.4% 4.1%;
    --popover-foreground: 210 20% 98%;

    --primary: 210 20% 98%;
    --primary-foreground: 220.9 39.3% 11%;

    --secondary: 215 27.9% 16.9%;
    --secondary-foreground: 210 20% 98%;

    --muted: 215 27.9% 16.9%;
    --muted-foreground: 217.9 10.6% 64.9%;

    --accent: 215 27.9% 16.9%;
    --accent-foreground: 210 20% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 20% 98%;

    --border: 215 27.9% 16.9%;
    --input: 215 27.9% 16.9%;
    --ring: 216 12.2% 83.9%;
  }
}`;

export function Creator() {
  const [cssTheme, setCssTheme] = useState(cssThemeStr);
  const [colorSchema, setColorSchema] = useState<ColorObject>();

  useEffect(() => {
    setColorSchema(colorSchema);
  }, [colorSchema]);

  function handleConvertToColor() {
    const colorsConverted = parseCssToColorObject(cssTheme);
    setColorSchema(colorsConverted);
  }

  return (
    <div className="space-y-8 w-full max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Creator Theme shadcn/ui</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste css theme here"
            rows={16}
            value={cssTheme}
            onChange={(e) => setCssTheme(e.currentTarget.value)}
          />
          <Button onClick={() => handleConvertToColor()}>Convert</Button>
        </CardContent>
      </Card>

      {colorSchema ? (
        <div className="flex flex-row gap-8">
          <TableColor data={colorSchema.root} title="Root" />
          <TableColor data={colorSchema.dark} title="Dark" />
        </div>
      ) : null}
    </div>
  );
}
