const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    devtool: 'source-map',
    devServer: {
        open: ['/react'], // Opens automatically to this path instead of root path '/'
        static: {
            directory: path.join(__dirname, 'assets')
        },
        hot: true
    },
    entry: {
        react: { import: './src/index.js', filename: './react/index.js' },  // Anything react related from index.js and bundles to './react/index.js'
        javascript: { import: './src/test.ts', filename: './javascript/test.js' }, // Anything Javascript related from test.js and bundles to './javascript/index.js'
        mainJavascript: { import: './src/main.js', filename: './javascript/main.js' } // Anything Javascript related from main.js and bundles to './javascript/main.js'
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'javascript',  // Gives the title the title tag in the head of the html file
            template: './src/index.html', // Looks for the html template in the src folder
            chunks: ['javascript'],  // Only bundles the javascript key from the entry object above (Code Spliting)
            filename: 'javascript/index.html' // Only bundles to the 'dist/javascript' directory
        }),
        new HTMLWebpackPlugin({
            title: 'react',  // Gives the title the title tag in the head of the html file
            template: './src/index.html',  // Looks for the html template in the src folder
            chunks: ['react'],   // Only bundles the react key from the entry object above (Code Spliting)
            filename: 'react/index.html'  // Only bundles to the 'dist/react' directory
        })
    ],
    output: {
        path: path.join(__dirname, '/dist'),
        clean: true,  // Cleans the dist folder before bundling
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
                    }
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,

            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}