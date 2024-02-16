import { ColorDefinition } from "@/utils/Color";
import { ColorPickerRow } from "./color-picker";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody } from "./ui/table";

interface TableColorProps {
  data: ColorDefinition[];
  title: string;
}
export function TableColor({ data, title }: TableColorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Color</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Hex</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((color, index) =>
              color.label.replaceAll("--", "") !== "radius" ? (
                <ColorPickerRow
                  key={`color-dark-${color.label}`}
                  color={color}
                />
              ) : null
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
