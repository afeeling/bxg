//require中的text插件可以提供一个读取一个页面的html,然后返回字符串,而artTemplate中的render方法可以读取
//字符串的html然后渲染。下面就是利用了这个方法完成了这些渲染页面的操作。
define(['jquery', 'text!tpls/teacherList.html', 'artTemplate', 'teacher/showInfo', 'teacher/addteacher', 'teacher/editteacher'], function($, teacherList, template, teacherInfo, teacherAdd, teacherEdit) {
    return function() {
        $.get("/api/teacher", {}, function(res) {
            //优化后：
            if (res.code != 200) throw new Error(res.msg);

            //----->代码能够执行到这里，数据一定成功返回
            console.log(res);
            var AllteacherList = template.render(teacherList, res);
            //将字符串AllteacherList转成jquery对象
            var $AllteacherList = $(AllteacherList);
            //启用 注册 按钮的实现
            $AllteacherList.on('click', '.btn-status', function() {
                    // alert('修改了用户状态');
                    $btn = $(this);
                    var data = {
                        tc_id: $(this).parent().attr('tc_id'),
                        tc_status: $(this).parent().attr('tc_status'),

                    }
                    $.post('api/teacher/handle', data, function(res) {
                        if (res.code !== 200) throw err('res.mag');
                        //修改按钮的文本
                        var tc_status = res.result.tc_status;
                        // console.log(tc_status);
                        $btn.text(tc_status == 0 ? "注销" : "启用");
                        //修改属性
                        // console.log(tc_status);
                        $btn.parent().attr('tc_status', tc_status);
                        //修改指定用户状态列的文本
                        console.log(tc_status);
                        $btn.parent().siblings('.td-status').text(tc_status == 0 ? '启用' : '注销');
                    })

                })
                //点击查看按钮的事件
            $AllteacherList.on('click', '.btn-show', function() {
                    var tc_id = $(this).parent().attr('tc_id');
                    console.log(tc_id);
                    // alert(111);
                    // console.log(teacherInfo());
                    teacherInfo(tc_id);

                })
                //点击修改讲师的按钮
            $AllteacherList.on('click', '.btn-edit', function() {
                var tc_id = $(this).parent().attr('tc_id');
                // alert(111);
                // console.log(teacherInfo());
                teacherEdit(tc_id);

            })

            //添加讲师
            $AllteacherList.on('click', '.btn-add', function() {
                teacherAdd();


                // var data = {
                //     tc_avatar: '../../imgs/pic.jpg',
                //     tc_name: '逍遥哥哥',
                //     tc_roster: '风一样的男子',
                //     tc_gender: 0,
                //     tc_join_date: '2017-3-20',
                //     tc_pass: '123456',
                //     tc_type: 1,
                //     tc_email: 'vitoAndyang@163.com',
                //     tc_cellphone: '18795458547',
                //     tc_birthday: 1449383737,
                // }
                // $.post('/api/teacher/add', data, function() {
                //     $(".menu-content-container").empty().append($AllteacherList);

                // })
            })
            $(".menu-content-container").empty().append($AllteacherList);
        })



    };

})