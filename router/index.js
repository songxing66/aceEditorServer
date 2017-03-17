/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-08-08 14:18:28
 * @version $Id$
 */
var fs = require('fs');
var path = require('path');
exports.index = function(req, res) {
    var action = req.params[0];
    if (!action || action == "index") {
        res.render('index', { title: "index" }); // 调用当前路径下的 index.jade 模板
    }

    if (exports[action]) {
        exports[action](req, res);
    }
};
exports.getRoot = function(req, res) { //获取目录
    var _path = req.body.path;
    //判断文件状态
    fs.stat(_path, function(err, stats) {
        if (err) {
            return console.error(err);
        }
        if (stats.isFile()) {
            res.json({
                success: true,
                data: {
                    filesList: [],
                }
            });
        } else {
            //读取目录
            fs.readdir(_path, function(err, files) {
                if (err) {
                    res.json({
                        success: true,
                        data: {
                            filesList: [],
                            // path: _path
                        }
                    });
                    return;
                }
                var filesList = [];
                for (let i = 0; i < files.length; i++) {
                    var fileType = undefined
                    var testPath = "";
                    if (_path == "./") {
                        testPath = _path + files[i]
                    } else {
                        testPath = _path + "/" + files[i]
                    }
                    //检查是否是文件夹
                    var stat = fs.lstatSync(testPath);
                    if (!stat.isDirectory()) {
                        fileType = files[i].substr(files[i].lastIndexOf(".")).toLowerCase();
                        // var reg = /\.\w+$/;
                        // var isTrueFile = reg.test(fileType);
                        if (stat.isSymbolicLink()) {
                            continue
                        }
                    }

                    var fileInfo = {
                        "name": files[i],
                        "isFile": !stat.isDirectory(),
                    }
                    if (fileType) {
                        fileInfo["fileType"] = fileType
                    }
                    filesList.push(fileInfo)
                }
                res.json({
                    success: true,
                    data: {
                        filesList: filesList,
                    }
                });
            });
        }
    });
}

exports.openFile = function(req, res) {
    fs.open(req.body.path, 'r+', function(err, fd) {
        if (err) {
            res.json({
                success: false,
                error: err
            });
            return
        }
        var content = fs.readFileSync(req.body.path).toString('utf-8');
        var fileType = req.body.path.substr(req.body.path.lastIndexOf(".")).toLowerCase();
        // 关闭文件
        fs.close(fd, function(err) {
            if (err) {
                res.json({
                    success: false,
                    error: err
                });
                return
            }
        });
        res.json({
            success: true,
            data: {
                content: content,
                fileType: fileType
            }
        });

    });

}



exports.saveFile = function(req, res) { //保存文件
        fs.open(req.body.path, 'r+', function(err, fd) {
            if (err) {
                res.json({
                    success: false,
                    error: err
                });
                return
            }
            fs.writeFile(req.body.path, req.body.value, function(err) {
                if (err) {
                    res.json({
                        success: false,
                        error: err
                    });
                    return
                }
                // 关闭文件
                fs.close(fd, function(err) {
                    if (err) {
                        res.json({
                            success: false,
                            error: err
                        });
                        return
                    }
                });
                res.json({
                    success: true,
                });
            });
        });

    }
    // function mkdirs(dirname, mode, callback) {
    //     fs.exists(dirname, function(exists) { //检查指定目录是否存在
    //         if (exists) {
    //             callback();
    //         } else {
    //             mkdirs(path.dirname(dirname), mode, function(err) { //调用自身函数 路径目录往上一层
    //                 if (err) {
    //                     return callback(err);
    //                 } else {
    //                     console.log("1" + dirname);
    //                     fs.mkdir(dirname, mode, callback);
    //                     console.log("1" + dirname);
    //                 }
    //             });
    //         }
    //     });
    // }

// exports.about = function(req, res) {
//     mkdirs("hahah/hahah1/hahah2/", 0777, function() {
//         console.log("文件夹已生成");
//     });
//     fs.readFile("./data/" + "data.json", 'utf8', function(err, data) {
//         var oData = JSON.parse(data);
//         res.render('about', { title: "这是about页面", user: oData });
//     });
// }