'use strict'

var path = require('path');

// 设置插件查找前缀

module.exports = function (fis) {
    fis.require.prefixes.unshift('fekey');
    fis.set('project.fileType.text', 'vue');
    if (fis.require.paths && fis.require.paths.length) {
        fis.require.paths.splice(1, 0, path.join(__dirname, 'node_modules'));
    }
    fis.hook('commonjs', {
        extList: ['.js', '.jsx', '.es', '.ts', '.tsx', 'es6', '.vue']
    });

    fis.match('**.vue', {
        isMod: true,
        rExt: 'js',
        useSameNameRequire: true,
        parser: fis.plugin('vue-component', {
            ccssScopedFlag: '__vuec__'
        }),
        useHash: true
    });

    fis.match('**.vue:js', {
        parser: fis.plugin('babel-5.x', {
            blacklist: ['regenerator'],
            stage: 3,
            // sourceMaps: true
        }),
        optimizer: fis.plugin('uglify-js')
    })

    fis.match('**.vue:jade', {
        parser: [
            fis.plugin('jade', {
            //
            })
        ]
    })

    fis.match('{**.vue:less,**.less}', {
        rExt: 'css',
        parser: [fis.plugin('less-2.x')],
        postprocessor: fis.plugin('autoprefixer')
    });

    fis.match('{**.vue:scss,**.scss}', {
        rExt: 'css',
        parser: [fis.plugin('node-sass')],
        postprocessor: fis.plugin('autoprefixer')
    });
}