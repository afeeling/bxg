define(['jquery', 'text!tpls/coursemanage.html', 'artTemplate', 'Editcategory/editcategorybaseInfo', 'Editcategory/editcategorypic'], function($, coursemanage, template, editcategorybaseInfo, editcategorypic) {
    return function() {
        $.get('/api/course', {}, function(res) {
            //jquery的方法不仅可以接受字符串 还可以接受一个jquery对象
            // console.log(res);
            var html = template.render(coursemanage, res.result);
            console.log(res.result);
            var $coursemanage = $(html);
            $coursemanage.on('click', '.btn-edit-course-time', function() {
                var cs_id = $(this).parent().attr('cs_id');
                sessionStorage.setItem("cs_id", cs_id);
                $('.aside .list-group button.btn-edit-course').trigger('click');

            }).on('click', '.btn-edit-course-baseinfo', function() {
                var cs_id = $(this).parent().attr('cs_id');
                editcategorybaseInfo(cs_id);
            }).on('click', 'img', function() {
                var cs_id = $(this).parent().attr('cs_id');
                editcategorypic(cs_id);
            })
            $(".menu-content-container").html($coursemanage);
        })
    }
})