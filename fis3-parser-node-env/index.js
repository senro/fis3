module.exports = function (content, file, options) {
    // 兼容node的全局变量
    var vars = {
        process: function () {
            return 'var process = require(\'process/browser\');';
        },
        global: function () {
            return 'var global = typeof global !== "undefined" ? global : '
                + 'typeof self !== "undefined" ? self : '
                + 'typeof window !== "undefined" ? window : {};'
                ;
        },
        Buffer: function () {
            return 'var Buffer = require("buffer").Buffer;';
        },
        'Buffer.isBuffer': function () {
            return 'Buffer.isBuffer = require("is-buffer");';
        }
    };

    // 替换node的一些全局变量
    var replaceVars = {
        __filename: function (file, basedir) {
            var filename = '/' + path.relative(basedir, file);
            return JSON.stringify(filename);
        },
        __dirname: function (file, basedir) {
            var dir = path.dirname('/' + path.relative(basedir, file));
            return JSON.stringify(dir);
        }
    };

    var content = content;
    var pushContent = [];
    var rest = file.rest;
    var basedir = '/';

    if (!file.isJsLike || !file.isMod) {
        return;
    }

    Object.keys(vars).forEach(function (name) {
        if (RegExp('\\b' + name + '\\b').test(content) && !(file.fullname.indexOf(name.toLowerCase()) >= 0)) {
            pushContent.push(vars[name](rest, basedir))
        }
    });

    //Object.keys(replaceVars).forEach(function (name) {
    //  content = content.replace(name, replaceVars[name](rest, basedir));
    //});


    // disabled.forEach(function (modules) {
    //   var moduleName = getModuleNameFromId(file.id);
    //   if (moduleName === modules.module) {
    //     content = content.replace(new RegExp("require\\(\\s?['\"]" + modules.key.replace('.', '\\.') + "['\"]\\s?\\)", "g"), '{}');
    //   }
    // });

    content = pushContent.join('\n') + '\n' + content;

    return content;
}