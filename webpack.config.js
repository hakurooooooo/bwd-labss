const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const page = (name) => new HtmlWebpackPlugin({
    template: `./src/${name}.html`,
    inject: true,
    chunks: ['index'],
    filename: `${name}.html`,
    favicon: './src/favicon.svg'
});

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        ],
    },
    plugins: [
        page('index'),
        page('tasks'),
        page('add_task'),
        page('projects'),
        page('about'),
    ],
    devServer: {
        static: { directory: path.join(__dirname, 'dist') },
        open: true,
    },
    mode: 'development',
};