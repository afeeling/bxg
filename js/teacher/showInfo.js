define(['jquery', 'text!tpls/showInfo.html', 'artTemplate', 'bootstrap'], function($, showInfo, template) {
    return function(tc_id) {
        $.post('/api/teacher/view', { "tc_id": tc_id }, function(res) {
            $('#modalShowTeacher').remove();
            var html = template.render(showInfo, res.result);
            var $teacherInfo = $(html)
            $('body').append($teacherInfo);
            $(html).modal();
        })
    }
})