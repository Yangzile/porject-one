const path = require('path');

module.exports = {
    entry: __dirname+'/public/javascripts/login.js',
    output: {
        path:  __dirname+'/dist',
        filename: 'bundle.js'
    }
};