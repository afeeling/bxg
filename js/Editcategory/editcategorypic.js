define(['jquery', 'text!tpls/editcategorypic.html', 'artTemplate', 'uploadify'], function($, editcategorypic, template) {
    return function(cs_id) {
        var cs_id = cs_id;
        $.get('/api/course/picture', { cs_id: cs_id }, function(res) {
            var $html = $(template.render(editcategorypic, res.result));
            $(".menu-content-container").html($html);
            $html.find('#uploadpic').uploadify({
                itemTemplate: "<span></span>", //指定进度条的模板 让进度条看不见
                formData: { cs_id: cs_id }, //需要额外提交的表单数据 表明是哪个封面图需要更改 需要传递一个id
                fileObjName: "cs_cover_original", //指定上传文件的时候，我们创建的input表单 id为uploadpic的name 
                swf: '../../assets/uploadify/uploadify.swf', //指向本地的flash文件(.swf)
                uploader: '/api/uploader/cover', //指向服务器的地址
                fileTypeExts: '*.gif; *.jpg; *.png', //限制上传文件类型
                buttonText: "选择图片",
                onUploadComplete: function() {
                    $(".aside .list-group button.btn-course").trigger('click');
                }
            })
        })
    }
})