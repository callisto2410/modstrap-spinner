const Path = require("path");
// noinspection NpmUsedModulesInstalled
const TerserPlugin = require("terser-webpack-plugin");

const WP = {
    mode: "production",
    devtool: "source-map",
    performance: {
        hints: false,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
    },
    entry: Path.resolve(__dirname, "demo", "src", "index.ts"),
    output: {
        filename: "bundle.js",
        path: Path.resolve(__dirname, "demo", "dist"),
    },
    cache: {
        type: "filesystem",
        cacheDirectory: Path.resolve(__dirname, ".cache"),
    },
};

WP.module = {
    rules: [
        {
            test: /\.s[ac]ss$/i,
            use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: false,
                        url: false,
                    }
                },
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                ["autoprefixer"],
                            ],
                        },
                    },
                },
                "sass-loader",
            ],
        },
        {
            test: /\.ts$/,
            use: [{
                loader: "ts-loader",
                options: {
                    configFile: "tsconfig.loader.json",
                }
            }],
        },
    ],
}

WP.resolve = {
    extensions: [".ts", ".js"],
}

module.exports = WP;
