import { ColorObject } from "./color";

function convertToObject(colorObject: ColorObject): Record<string, string> {
  const result: Record<string, string> = {};

  Object.keys(colorObject).forEach((theme) => {
    colorObject[theme as keyof ColorObject].forEach((colorDefinition) => {
      result[colorDefinition.id] = colorDefinition.color;
    });
  });

  return result;
}

export { convertToObject };
