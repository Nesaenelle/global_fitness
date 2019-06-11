const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var StylusNibPlugin = require('nib')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

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
        new HtmlWebpackPlugin({
            filename: 'catalog.html',
            template: 'src/template/pages/catalog.pug',
            page: 'catalog'
        }),
        new HtmlWebpackPlugin({
            filename: 'sell-out.html',
            template: 'src/template/pages/sell-out.pug',
            page: 'catalog'
        }),
        new HtmlWebpackPlugin({
            filename: 'product-card.html',
            template: 'src/template/pages/product-card.pug',
            page: 'catalog'
        }),
        new HtmlWebpackPlugin({
            filename: 'compare.html',
            template: 'src/template/pages/compare.pug',
            page: 'catalog'
        }),
        new HtmlWebpackPlugin({
            filename: 'search.html',
            template: 'src/template/pages/search.pug',
            page: 'catalog'
        }),
        new ExtractTextPlugin({ allChunks: true, filename: "styles.css" }),
        new CopyWebpackPlugin([
            { from: 'src/img', to: 'img' }
        ]),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery'",
            "window.$": "jquery"
         })
    ],

    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, ''),
        // publicPath: "/",
        port: 9000
    }
};