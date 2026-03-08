/// <reference types="react" />
/// <reference types="react-dom" />

// Some tooling may not locate React or its JSX runtime modules correctly; provide
// simple ambient signatures so the compiler stops complaining.
declare module "react";
declare module "react/jsx-runtime";
declare module "react/jsx-dev-runtime";

// provide module declarations for other packages without types

declare module "embla-carousel-react";
declare module "lucide-react";
declare module "recharts";
declare module "react-slick";
declare module "react-responsive-masonry";
declare module "react-resizable-panels";
declare module "react-day-picker";
declare module "input-otp";
declare module "motion";
declare module "vaul";
