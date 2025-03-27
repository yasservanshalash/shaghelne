// This file is used to declare types for modules that don't have type definitions

declare module "*.jsx" {
  const content: React.ComponentType<any>;
  export default content;
}

declare module "*.jpg";
declare module "*.png";
declare module "*.svg"; 