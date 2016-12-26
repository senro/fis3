module.exports = function (content, file, options) {
    var globalVars=file.globalVars,regs=[];
    for(var varName in globalVars){
        content=content.replace(new RegExp('{{'+varName+'}}','g'),globalVars[varName]);
    }

    return content; // 处理后的文件内容
}