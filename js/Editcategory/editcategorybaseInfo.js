define(['jquery', 'text!tpls/editcategorybaseInfo.html', 'artTemplate'], function($, editcategorybaseInfo, template) {
    return function(cs_id) {
        $html = $(editcategorybaseInfo);
        $.get('/api/course/basic', { 'cs_id': cs_id }, function(res) {
            console.log(res);
            var $html = $(template.render(editcategorybaseInfo, res.result));
            console.log(res.result);
            $html.on('change', '.select-top', function() {
                var topId = $(this).val();
                console.log(topId);
                $.get('/api/category/child', { cg_id: topId }, function(res) {
                    var str = '';
                    res.result.forEach(function(ele) {
                        str += '<option value=' + ele.cg_id + ' >' + ele.cg_name + '</option>';
                    })
                    $html.find('.select-second').html(str);
                })
            }).on('submit', 'form', function() {
                var formData = $(this).serialize();
                console.log(formData);
                $.post('/api/course/update/basic', formData, function() {
                    // $('.aside .list-group button.btn-edit-course').trigger('click');
                    $(".aside .list-group button.btn-course").trigger('click');
                    $('body').animate({ scrollTop: 0 }, 'fast');
                })
                return false;
            })
            $(".menu-content-container").html($html);
        })
    }

})