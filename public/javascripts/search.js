$(function () {
    $('#search_send').on('click',function (){
        var search_key = $("#search_key");

        if (search_key.val() == '') {
            alert("搜索不能为空");
            return false;
        }
    });
})