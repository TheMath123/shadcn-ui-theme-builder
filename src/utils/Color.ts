export type ColorDefinition = {
  label: string;
  color: string;
};

export type ColorObject = {
  root: ColorDefinition[];
  dark: ColorDefinition[];
};

function parseCssToColorObject(cssString: string): ColorObject {
  // Função auxiliar para extrair cores de um bloco CSS
  const extractColors = (block: string): ColorDefinition[] => {
    const colorDefinitions: ColorDefinition[] = [];
    const lines = block.split("\n");
    lines.forEach((line) => {
      const match = line.match(/(--[^:]+):\s*([^;]+);/);
      if (match) {
        colorDefinitions.push({
          label: match[1].trim(),
          color: match[2].trim(),
        });
      }
    });
    return colorDefinitions;
  };

  // Dividir o CSS em partes para 'root' e 'dark'
  const rootBlockMatch = cssString.match(/:root\s*{([^}]+)}/);
  const darkBlockMatch = cssString.match(/\.dark\s*{([^}]+)}/);

  // Extrair cores usando a função auxiliar
  const rootColors = rootBlockMatch ? extractColors(rootBlockMatch[1]) : [];
  const darkColors = darkBlockMatch ? extractColors(darkBlockMatch[1]) : [];

  // Criar e retornar o objeto estruturado
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

export { parseCssToColorObject, hslToHex };
