import usage from "./usage";

export const accordionContent = {
  setup: {
    template: "vite-react-ts",
    customSetup: {
      dependencies: {
        "@nextui-org/react": "latest",
        "framer-motion": "10.12.16",
      },
      devDependencies: {
        autoprefixer: "^10.4.14",
        postcss: "^8.4.21",
        tailwindcss: "^3.2.7",
      },
    },
  },
  usage,
};
