declare var process: {
  env: {
    NODE_ENV: string;
    [key: string]: string | undefined;
  };
};

interface ImportMeta {
  readonly env: {
    readonly NODE_ENV: string;
    [key: string]: any;
  };
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.css";
declare module "*.scss";
declare module "*.sass";
