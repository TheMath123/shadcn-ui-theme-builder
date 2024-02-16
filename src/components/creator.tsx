"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { parseCssToColorObject } from "@/utils/color";
import { Button } from "./ui/button";
import { TableColor } from "./table-color";
import { useColors } from "@/lib/colors";
import { createTemplate } from "@/utils/template";

export function Creator() {
  const [cssTheme, setCssTheme] = useState("");
  const [colorSchema, setColorSchema] = useColors();

  useEffect(() => {
    if (colorSchema) {
      const strColors = createTemplate(colorSchema);
      setCssTheme(strColors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorSchema]);

  function handleConvertToColor() {
    const colorsConverted = parseCssToColorObject(cssTheme);
    setColorSchema(colorsConverted);
  }

  return (
    <div className="space-y-8 w-full max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Shadcn/UI Theme Builder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <pre>
            <code>
              <Textarea
                placeholder="Paste css theme here"
                rows={16}
                value={cssTheme}
                onChange={(e) => setCssTheme(e.currentTarget.value)}
              />
            </code>
          </pre>
          <Button onClick={() => handleConvertToColor()}>Convert</Button>
        </CardContent>
      </Card>

      {colorSchema ? (
        <div className="flex flex-row gap-8">
          <TableColor data={colorSchema.root} title="Light" />
          <TableColor data={colorSchema.dark} title="Dark" />
        </div>
      ) : null}
    </div>
  );
}
