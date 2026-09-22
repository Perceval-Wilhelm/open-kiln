import { exec } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { Plugin } from "vite";

const PLUGIN_NAME = "vite-tw-merge";
const FILE_PATH = path.resolve(process.cwd(), "src/styles/global.css");
const CONFIG_PATH = path.resolve(process.cwd(), "src/configs/tailwind-variables.config.ts");

export default function twMerge(): Plugin {
  return {
    name: PLUGIN_NAME,
    configureServer: (server) => {
      server.watcher.add(FILE_PATH);
      server.watcher.on("change", (path) => {
        if (path !== FILE_PATH) return;

        const colorVars: Array<string> = [];
        const content = readFileSync(FILE_PATH, "utf-8");
        const regex = /(--color-[^\s:]+)/g;

        let match;
        while ((match = regex.exec(content)) !== null) {
          colorVars.push(match[1].slice("--color-".length));
        }

        writeFileSync(
          CONFIG_PATH,
          [
            "// AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY",
            `// This file is generated automatically by ${PLUGIN_NAME}`,
            `export const COLORS = [${colorVars.map((v) => JSON.stringify(v)).join(",\n  ")}]`,
          ].join("\n"),
        );

        exec(`eslint --fix "${CONFIG_PATH}"`);
        exec(`npx prettier --write "${CONFIG_PATH}"`);

        console.log("Update TailwindCSS variables");
      });
    },
  };
}
