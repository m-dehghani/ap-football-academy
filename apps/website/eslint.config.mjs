import nextTypescript from "eslint-config-next/typescript";
import next from "eslint-config-next";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import { dirname } from "path";
import { fileURLToPath } from "url";
import nx from "@nx/eslint-plugin";
import baseConfig from "../../eslint.config.mjs";

export default [
    ...nextTypescript,
    ...next,
    ...nextCoreWebVitals,
    ...baseConfig,
    ...nx.configs["flat/react-typescript"],
    {
        ignores: [
            ".next/**/*"
        ]
    }
];
