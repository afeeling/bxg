define(['jquery', 'text!tpls/addcourse.html'], function($, addcourse) {
    return function() {
        var $html = $(addcourse);
        var $modal = $('#modalCreateCourse');
        $modal.remove();
        $html.on('submit', 'form', function() {
            var formData = $(this).serialize();
            $.post('/api/course/create', formData, function(res) {
                $('.aside .list-group button.btn-course').trigger('click');
            })
            $html.modal('hide');
            return false;
        }).appendTo('body').modal();
    }
})