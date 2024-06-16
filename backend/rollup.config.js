/* eslint-disable */
import tsConfigPaths from "rollup-plugin-tsconfig-paths";
import esbuild from "rollup-plugin-esbuild";

const input = "src/main.ts";

const esmStep = {
    input: input,
    plugins: [tsConfigPaths(), esbuild()],
    output: {
        format: "es",
        dir: "dist",
        sourcemap: true
    }
};

const steps = [];
steps.push(esmStep);

export default steps;
