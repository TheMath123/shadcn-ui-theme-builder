export type ColorDefinition = {
  id: string;
  label: string;
  color: string;
};

export type ColorObject = {
  root: ColorDefinition[];
  dark: ColorDefinition[];
};

function parseCssToColorObject(cssString: string): ColorObject {
  const extractColors = (block: string, prefix: string): ColorDefinition[] => {
    const colorDefinitions: ColorDefinition[] = [];
    const lines = block.split("\n");
    lines.forEach((line) => {
      const match = line.match(/(--[^:]+):\s*([^;]+);/);
      if (match) {
        const name = match[1].trim().substring(2);
        const id = `${prefix}-${name}`;
        colorDefinitions.push({
          id,
          label: match[1].trim(),
          color: match[2].trim(),
        });
      }
    });
    return colorDefinitions;
  };

  const rootBlockMatch = cssString.match(/:root\s*{([^}]+)}/);
  const darkBlockMatch = cssString.match(/\.dark\s*{([^}]+)}/);

  const rootColors = rootBlockMatch
    ? extractColors(rootBlockMatch[1], "root")
    : [];
  const darkColors = darkBlockMatch
    ? extractColors(darkBlockMatch[1], "dark")
    : [];

  return {
    root: rootColors,
    dark: darkColors,
  };
}

function hslToHex(hsl: string): string {
  const [h, s, l] = hsl
    .split(" ")
    .map((value, index) =>
      index === 0 ? parseInt(value, 10) : parseFloat(value) / 100
    );

  if (s === 0) {
    // Achromatic, i.e., grey
    const val = Math.round(l * 255).toString(16);
    return `#${val}${val}${val}`;
  }

  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const r = hue2rgb(p, q, h / 360 + 1 / 3);
  const g = hue2rgb(p, q, h / 360);
  const b = hue2rgb(p, q, h / 360 - 1 / 3);

  const toHex = (x: number) => {
    const hex = Math.round(x * 255)
      .toString(16)
      .toUpperCase();
    return hex.length === 1 ? "0" + hex : hex;
  };

  const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  return hexColor;
}

function hexToHSL(hex: string): string {
  // Remove the '#' if it's present
  hex = hex.replace(/^#/, "");

  // Convert hex to RGB values
  let r: number, g: number, b: number;
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }

  // Convert RGB to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h: number = 0; // Initialize 'h' to avoid error
  let s: number,
    l: number = (max + min) / 2;

  if (max === min) {
    s = 0; // Achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  // Convert to percentages
  s *= 100;
  l *= 100;
  h *= 360;

  // Round the values
  h = Math.round(h);
  s = Math.round(s * 10) / 10; // Round to one decimal place
  l = Math.round(l * 10) / 10; // Round to one decimal place

  return `${h}, ${s}%, ${l}%`;
}

export { parseCssToColorObject, hslToHex, hexToHSL };
