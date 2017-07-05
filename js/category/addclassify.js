define(['jquery', 'artTemplate', 'text!tpls/addclassify.html', 'bootstrap', 'api'], function($, template, addclassify, api) {
    return function() {
        $.get('/api/category/top', {}, function(res) {
            // if (res.code !== 200) throw err(res.msg);
            // addclassify = template.render(addclassify, res.result);
            var html = template.render(addclassify, res.result);
            var $modal = $('#Addclassify');
            $modal.remove();
            var $addclassify = $(html);
            var $test = $(html);
            console.log($test === $addclassify);
            $addclassify.appendTo('body').modal();
            $addclassify.on('submit', 'form', function() {
                var data = $(this).serialize();
                console.log(data);
                $.post('/api/category/add', data, function() {

                    $('.aside .list-group button.btn-course-category').trigger('click');
                    $addclassify.modal('hide');
                })
                return false;
            })
        })
    }
})