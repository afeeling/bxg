require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-2.1.4',
        cookie: 'lib/jquery.cookie',
        text: 'lib/text',
        tpls: '../tpls',
        artTemplate: 'lib/template-web',
        bootstrap: '../assets/bootstrap/js/bootstrap',
        datetime: '../assets/dateTime/js/bootstrap-datetimepicker',
        api: 'api',
        uploadify: '../assets/uploadify/jquery.uploadify',
    },
    shim: {
        cookie: {
            deps: ['jquery'],
        },
        bootstrap: {
            deps: ['jquery'],
        },
        datetime: {
            deps: ['bootstrap']
        },
        uploadify: {
            deps: ['jquery'],
        }
    }
})
require(['jquery', 'teacher/teacherList', 'category/categotyList', 'manage/coursemanageList', 'manage/addcourse', 'Editcategory/editcategoryList', 'personal', 'cookie'], function($, teacherList, categoryList, coursemanageList, addcourse, editcategory, personal) {
    // cookie中的loginInfo是一个字符串，需要转换为对象才能使用
    var loginInfo = $.cookie('loginInfo');
    if (!loginInfo) {
        location.href = 'login.html';
    }
    loginInfo = JSON.parse(loginInfo);
    console.log(loginInfo);
    loginInfo.tc_avatar = 'imgs/monkey.png';
    //2、更新用户名和头像
    $(".profile-container .img-container img").attr("src", loginInfo.tc_avatar);
    $(".profile-container h4").text(loginInfo.tc_name);

    //3、实现菜单栏切换
    $(".aside .list-group").on("click", "button", function() {
        $(this).addClass('active').siblings().removeClass('active');
        switch ($(this).index()) {
            case 0:
                teacherList();
                break;
            case 1:
                // $(".menu-content-container").html("课程管理");
                coursemanageList();
                break;
            case 2:
                addcourse();
                break;
            case 3:
                editcategory();
                break;
            case 4:
                categoryList();
                break;
            case 5:
                // teacherList();
                $(".menu-content-container").html("图标统计");
                break;
        }
    });
    $('.content-container .personal').on('click', function() {
        personal();

    })
    $('.aside .list-group button').eq(0).trigger('click');
    $.fn.datetimepicker.dates['zh-CN'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        today: "今天",
        suffix: [],
        meridiem: ["上午", "下午"]
    };
    //滚动到顶部

    var $gotop = $('#gotop');
    $(document).scroll(function() {
        var minHeight = $('body').scrollTop();
        if (minHeight > 600) {
            $gotop.show(1000);
        } else {
            $gotop.hide(1000);
        }
    })
    $gotop.on('click', function() {
        $('body').animate({ 'scrollTop': 0 })
    })

})