define(['jquery', 'text!tpls/categoryList.html', 'artTemplate', 'api', 'category/addclassify', 'category/editclassify'], function($, categoryList, template, api, addclassify, editclassify) {
    return function() {
        // console.log(api);

        api.get('category', {}, function(res) {
            // if (res.code != 200) throw new Error(res.msg);
            // console.log(res);
            var categoryhtml = template.render(categoryList, res);
            // console.log(categoryhtml);
            // console.log(res.result);
            var $categoryhtml = $(categoryhtml);
            $categoryhtml.on('click', '.add-classify', function() {
                addclassify();
            })
            $categoryhtml.on('click', '.btn-edit', function() {
                var cg_id = $(this).parent().attr('cg_id');
                console.log(cg_id);
                editclassify(cg_id);
            })
            $(".menu-content-container").html($categoryhtml);
        })
    }
})