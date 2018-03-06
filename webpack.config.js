module.exports = {
    //entry: './app/assets/js/core.js',
    output: {
        //path: path.resolve(__dirname, './app/dist'),
        filename: 'core.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
};