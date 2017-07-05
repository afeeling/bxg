define(['jquery', 'artTemplate', 'text!tpls/editcategory.html', 'Editcategory/editcategorytime', 'Editcategory/editcategorybaseInfo'], function($, template, editcategory, editcategorytime, editcategorybaseInfo) {
    return function() {
        var cs_id = sessionStorage.getItem('cs_id');
        var tc_name = sessionStorage.getItem('tc_name');
        var cs_cover = sessionStorage.getItem('cs_cover');
        // var $modal = $('.panel-default');
        // $modal.remove();
        $.get('/api/course/lesson', { cs_id: cs_id }, function(res) {
            // console.log(res);
            var html = template.render(editcategory, res);
            var $html = $(html);
            $html.on('click', '.btn-edit-course-time', function() {
                var ct_id = $(this).parent().attr('ct_id');
                editcategorytime(ct_id);
            });
            // $html.on('click', '.btn-edit-course-baseinfo', function() {
            //     alert(123);
            // })
            $(".menu-content-container").html($html);
        })
    }
})