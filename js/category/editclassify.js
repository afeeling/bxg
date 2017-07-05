define(['jquery', 'artTemplate', 'text!tpls/editclassify.html', 'bootstrap', ], function($, template, editclassify) {
    return function(cg_id) {
        // console.log(cg_id);
        $.get('/api/category/edit', { cg_id: cg_id }, function(res) {
            // console.log(res);
            // console.log(res.top);
            // editclassify = template.render(editclassify, res.result);
            // console.log(res.result);
            $modal = $('#Editclassifty');
            $modal.remove();
            res.result.top.unshift({
                "cg_id": 0,
                "cg_name": '顶级分类'
            });
            console.log(res.result.cg_pid);
            // console.log(res.cg_pid);
            console.log(res.result.top);
            var edithtml = template.render(editclassify, res.result);
            var $editclassify = $(edithtml);
            $editclassify.appendTo('body').modal();
            $editclassify.on('submit', 'form', function() {
                var data = $(this).serialize();
                console.log(data);
                $.post('/api/category/modify', data, function(res) {

                    $('.aside .list-group button.btn-course-category').trigger('click');
                    $editclassify.modal('hide');
                })
                return false;
            })
        })
    }
})