import _ from "lodash";
import { ColorObject } from "./color";
import { convertToObject } from "./convert";

const globalsTemplate = `@layer base {
  :root {
    --background: <%- obj["root-background"] %>;
    --foreground: <%- obj["root-foreground"] %>;

    --card: <%- obj["root-card"] %>;
    --card-foreground: <%- obj["root-card-foreground"] %>;

    --popover: <%- obj["root-popover"] %>;
    --popover-foreground: <%- obj["root-popover-foreground"] %>;

    --primary: <%- obj["root-primary"] %>;
    --primary-foreground: <%- obj["root-primary-foreground"] %>;

    --secondary: <%- obj["root-secondary"] %>;
    --secondary-foreground: <%- obj["root-secondary-foreground"] %>;

    --muted: <%- obj["root-muted"] %>;
    --muted-foreground: <%- obj["root-muted-foreground"] %>;

    --accent: <%- obj["root-accent"] %>;
    --accent-foreground: <%- obj["root-accent-foreground"] %>;

    --destructive: <%- obj["root-destructive"] %>;
    --destructive-foreground: <%- obj["root-destructive-foreground"] %>;

    --border: <%- obj["root-border"] %>;
    --input: <%- obj["root-input"] %>;
    --ring: <%- obj["root-ring"] %>;

    --radius: <%- obj["root-radius"] %>;
  }

  .dark {
    --background: <%- obj["dark-background"] %>;
    --foreground: <%- obj["dark-foreground"] %>;

    --card: <%- obj["dark-card"] %>;
    --card-foreground: <%- obj["dark-card-foreground"] %>;

    --popover: <%- obj["dark-popover"] %>;
    --popover-foreground: <%- obj["dark-popover-foreground"] %>;

    --primary: <%- obj["dark-primary"] %>;
    --primary-foreground: <%- obj["dark-primary-foreground"] %>;

    --secondary: <%- obj["dark-secondary"] %>;
    --secondary-foreground: <%- obj["dark-secondary-foreground"] %>;

    --muted: <%- obj["dark-muted"] %>;
    --muted-foreground: <%- obj["dark-muted-foreground"] %>;

    --accent: <%- obj["dark-accent"] %>;
    --accent-foreground: <%- obj["dark-accent-foreground"] %>;

    --destructive: <%- obj["dark-destructive"] %>;
    --destructive-foreground: <%- obj["dark-destructive-foreground"] %>;

    --border: <%- obj["dark-border"] %>;
    --input: <%- obj["dark-input"] %>;
    --ring: <%- obj["dark-ring"] %>;
  }
}`;

const createTemplate = (colors: ColorObject) => {
  const dataTemplate = convertToObject(colors);
  const compiled = _.template(globalsTemplate);
  const result = compiled({ obj: dataTemplate });
  return result;
};

export { createTemplate };
