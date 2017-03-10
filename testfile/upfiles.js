/**
 * iconupload.js
 * @authors Your Name (you@example.org)
 * @date    2016-03-18 18:10:41
 * @version $Id$
 */

$(document).ready(function() {
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    }


    var xhr;
    var upfilebtn = document.getElementById("up-filesbtn");
    upfilebtn.addEventListener("dragover", function(e) {
        e.preventDefault(); //取消默认浏览器拖拽效果 
        $(this).addClass("active");
        //检测文件是不是图片 
    }, false);

    upfilebtn.addEventListener("dragleave", function(e) {
        e.preventDefault(); //取消默认浏览器拖拽效果 
        $(this).removeClass("active");
    }, false);

    upfilebtn.addEventListener("drop", function(e) {
        e.preventDefault(); //取消默认浏览器拖拽效果
        $(this).removeClass("active");
        var fileList = e.dataTransfer.files; //获取文件对象
        if (fileList.length > 1) {
            alert("每次只能放一张图片");
        } else if (fileList.length == 0) {
            return false;
        } else {
            var nameid = $(this).attr("data-slectbox");
            var datafiles = fileList[0];
            var ziptype = $(this).attr("data-filetype");
            checkfiles(datafiles, nameid, ziptype);
        }
    }, false);

    $(".upload-user-btn").change(function(obj, evt) {
        if ($(this).val()) {
            var nameid = $(this).attr("data-slectbox");
            var datafiles = this.files[0];
            var ziptype = $(this).attr("data-filetype");
            checkfiles(datafiles, nameid, ziptype);

        }
    })

    function checkfiles(files, name, type) {
        var size = 10485760;
        var bImgGo = true;
        var filesname = files.name;
        var namearry=filesname.split(".");
        var filessize = files.size;
        var filestype = namearry[namearry.length-1];
        var btype =filestype==type?1:-1;
        if (btype < 0 && filessize <= size) {
            alert("格式不对");
        } else if (btype > -1 && filessize > size) {
            alert("文件超出大小")
        } else if (btype < 0 && filessize > size) {
            alert("请按规定上传")
        } else {
            senfiles(name, files, filesname, filessize);
        }

    }

    function canceluploda(slect) {
        var filechobtn = document.getElementById("filechobtn");
        $(filechobtn).val("");
        filechobtn.select();
        document.execCommand('Delete');
        xhr.abort();
        var slectbox = $("#" + slect);
        setTimeout(function() {
            slectbox.find(".upload-user-img").removeClass("active");
        }, 300)
        slectbox.find(".upload-loading").fadeOut('500');
        slectbox.find("#files-name").css("opacity", "0").text("");
        slectbox.find(".fils-cancel").hide();
        slectbox.find(".upload-prograssbox").css("opacity", "0");
        setTimeout(function() {
            slectbox.find(".uploaded-pro").width("0");
        }, 300)

    }
    $("#cancelbtn").click(function() {
        var nameid = $(this).attr("data-slectbox");
        canceluploda(nameid);
    })

    function senfiles(slect, files, name, size) {
        //上传文件开始
        console.log(files);
        var filename = files.name;
        var csvf = $('meta[name="csrf-token"]').attr('content');
        var script_id = $("#script_id").val();
        var upbox = $("#" + slect);
        // var filestype = upbox.find(".upload-user-btn").attr("data-filetype");
        // console.log(filestype);
        var progresswid = upbox.find(".upload-prograssbox").width();
        upbox.find(".upload-user-img").addClass("active");
        upbox.find(".upload-loading").show();
        upbox.find("#files-name").css("opacity", "1").text(name);
        upbox.find(".fils-cancel").show();
        xhr = new XMLHttpRequest();
        xhr.open("post", "/p4u/script/upload", true);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.upload.addEventListener("progress", function(evt) {
            var percentComplete = evt.loaded / evt.total;
            var loadedwidth = percentComplete * progresswid;
            upbox.find(".upload-prograssbox").css("opacity", "1")
            upbox.find(".uploaded-pro").width(loadedwidth - 20);
        });
        xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    var response = xhr.responseText;
                    response = $.parseJSON(response);
                    console.log(response);
                    if (response.success) {
                    if (response.uploaded) {
                        if (response.key.length > 0) {
                            var id = GetQueryString("id");
                            var id_url = (!id)?"":"&id="+id;
                            window.location.href = '?upload_key=' + response.key + '&filename=' + response.filename + '&filesize=' + response.filesize + '&time=' + response.time + '&v=' + response.validate + id_url;
                        }
                    } else {
                        alertNavtopBarDanger(response.message);
                        $(".upload-user-btn").val("");
                        window.setTimeout(function () {
                            location.reload();
                        }, 5000);
                    }
                }
                }
            }
            // 发送数据
        var fd = new FormData();
        fd.append('p4uUpload[qqfile]', files);
        fd.append('_csrf', csvf);
        fd.append('p4uUpload[qquuid]', "f973ea67-a60f-4e8c-b58a-9c45dcfd0fee");
        fd.append('p4uUpload[qqfilename]', name);
        fd.append('p4uUpload[qqtotalfilesize]', size);
        // fd.append('type', filestype);
        xhr.send(fd);
    }
})