   define(['jquery', 'text!tpls/addteacher.html', 'datetime', 'bootstrap', ], function($, addteacher) {
       return function() {
           var $addteacher = $(addteacher);
           var $modalAddTeacher = $('#modalAddTeacher');
           $modalAddTeacher.remove();
           $addteacher.on('submit', 'form', function() {
               var formData = $(this).serialize();
               $.post('/api/teacher/add', formData, function(res) {
                   if (res.code !== 200) throw err(res.msg);
                   $('.aside .list-group button').eq(0).trigger('click');
                   $addteacher.modal('hide')
               })
               return false;
           }).appendTo('body').modal();

           $('#datetimepicker').datetimepicker({
               format: 'yyyy-mm-dd', //格式化日期格式
               //    language: "zh-CN", //选择语言，需要引入语言包
               autoclose: true, //选完一个日期之后就会自动隐藏日期框
               minView: "month",
               todayBtn: true,
               todayHighlight: true //当选择其他日期的时候，高亮今天的日期
           });
       }
   })