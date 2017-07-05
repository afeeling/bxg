define(['jquery', 'text!tpls/editcategorytime.html', 'artTemplate'], function($, editcategorytime, template) {
    return function(ct_id) {
        $modal = $('#modalEditCourseTime');
        $modal.remove();
        $.get('/api/course/chapter/edit', { ct_id: ct_id }, function(res) {
            console.log(res);
            var html = template.render(editcategorytime, res);
            var $html = $(html);
            $html.appendTo('body').modal();
            $html.on('submit', 'form', function() {
                var formData = $(this).serialize();
                console.log(formData);
                $.post('/api/course/chapter/modify', formData, function() {
                    $('.aside .list-group button.btn-edit-course').trigger('click');
                    $html.modal('hide');
                })
                return false;
            })
        })
    }
})