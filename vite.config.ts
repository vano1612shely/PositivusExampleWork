import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { fileURLToPath, URL } from "url";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr({ include: "**/*.svg?react" }), react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "@assets",
        replacement: fileURLToPath(new URL("./src/assets", import.meta.url)),
      },
    ],
  },
  base: "/PositivusExampleWork",
});
