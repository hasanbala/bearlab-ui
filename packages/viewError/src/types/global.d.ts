// Resim dosya türleri için tip tanımlamaları
declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}

// Font dosya türleri için tip tanımlamaları
declare module "*.woff" {
  const content: string;
  export default content;
}

declare module "*.woff2" {
  const content: string;
  export default content;
}

declare module "*.ttf" {
  const content: string;
  export default content;
}

declare module "*.otf" {
  const content: string;
  export default content;
}

// SVG dosyaları için özel tip tanımlaması
declare module "*.svg" {
  import * as React from "react";

  // SVG'yi React bileşeni olarak kullanmak için
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  // SVG'yi dosya yolu olarak kullanmak için
  const src: string;
  export default src;
}

// CSS/SCSS modülleri için tip tanımlamaları
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

// Normal CSS/SCSS dosyaları
declare module "*.css";
declare module "*.scss";
declare module "*.sass";
