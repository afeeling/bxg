define(["jquery", "text!tpls/teacherEdit.html", "artTemplate", "bootstrap", 'datetime'], function($, teacherEditTpl, art) {
    return function(tc_id) {
        //console.log("编辑讲师");

        $.get("/api/teacher/edit", { tc_id: tc_id }, function(res) {

            if (res.code != 200) throw new Error(res.msg);


            $("#modalEditTeacher").remove();

            var teacherEdit = art.render(teacherEditTpl, res.result);


            //$teacherEdit-->$(teacherEdit)返回值，也是后面的每一个分句的返回值
            var $teacherEdit = $(teacherEdit).on("submit", "form", function() {
                var formData = $(this).serialize();
                console.log(formData);
                $.post("/api/teacher/update", formData, function(res) {
                    if (res.code != 200) throw new Error(res.msg);


                    $teacherEdit.modal("hide");
                    //刷新讲师管理模块页面
                    $('.aside .list-group button').eq(0).trigger('click');

                })

                return false;
            }).appendTo("body").modal();
            $('#datetimepicker').datetimepicker({
                format: 'yyyy-mm-dd', //格式化日期格式
                //    language: "zh-CN", //选择语言，需要引入语言包
                autoclose: true, //选完一个日期之后就会自动隐藏日期框
                minView: "month",
                todayBtn: true,
                todayHighlight: true //当选择其他日期的时候，高亮今天的日期
            });
        })
    };
});