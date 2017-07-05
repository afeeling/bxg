define(['jquery', 'text!tpls/personal.html', 'artTemplate', 'datetime', 'bootstrap'], function($, personal, template) {
    return function() {
        $('#personalModal').remove();
        $.get('/api/teacher/profile', {}, function(res) {
            console.log(res.result);
            var $html = $(template.render(personal, res.result)).on('submit', 'form', function() {
                var formData = $(this).serialize();
                $.post('/api/teacher/modify', formData, function() {
                    $html.modal('hide');
                    $('.aside .list-group button').eq(0).trigger('click');
                });
                return false;
            }).appendTo('body').modal();
            $('.date-birthday').datetimepicker({
                format: 'yyyy-mm-dd', //格式化日期格式
                language: "zh-CN", //选择语言，需要引入语言包
                autoclose: true, //选完一个日期之后就会自动隐藏日期框
                minView: "month",
                todayBtn: true,
                todayHighlight: true //当选择其他日期的时候，高亮今天的日期
            });

        })
    }
})