const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var StylusNibPlugin = require('nib')
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        // publicPath: '/'
    },
    stats: {

    },
    module: {
        rules: [
            // Include pug-loader to process the pug files
            {
                test: /\.pug$/,
                use: 'pug-loader'
            },
            {
                test: /\.(css|styl)$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                            loader: 'css-loader',
                            options: { importLoaders: 1, sourceMap: true }
                        },
                        {
                            loader: 'stylus-loader',
                            options: { sourceMap: true },
                        },
                    ]
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        publicPath: 'src/img',
                    }
                }
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/template/pages/home.pug',
            page: 'home'
        }),
        new HtmlWebpackPlugin({
            filename: 'about.html',
            template: 'src/template/pages/about.pug',
            page: 'about'
        }),
        new HtmlWebpackPlugin({
            filename: 'our-team.html',
            template: 'src/template/pages/our-team.pug',
            page: 'about'
        }),
        new HtmlWebpackPlugin({
            filename: 'our-clients.html',
            template: 'src/template/pages/our-clients.pug',
            page: 'about'
        }),
        new HtmlWebpackPlugin({
            filename: 'quality.html',
            template: 'src/template/pages/quality.pug',
            page: 'about'
        }),
        new ExtractTextPlugin({ allChunks: true, filename: "styles.css" }),
        new CopyWebpackPlugin([
            { from: 'src/img', to: 'img' }
        ]),
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, ''),
        // publicPath: "/",
        port: 9000
    }
};