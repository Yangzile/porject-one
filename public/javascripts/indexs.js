$(function () {
    // #轮播切换时间设置为2秒，默认是5秒
    $('#myCarousel').carousel({
        interval: 2000,
    })
    //   #点击轮播图下方小圆点可以改变轮播图片
    $("#myCarousel li").click(function () {
        var index=$(this).attr("data-slide-to")
        $('#myCarousel').carousel(parseInt(index))
    })
    $('#gg').click(function () {
        $('header').remove();
    })
    $(".dropdown").mouseover(function () {
        $(this).addClass("open");
    });
    $(".dropdown").mouseleave(function(){
        $(this).removeClass("open");
    })
    $(".content-col1.fl").find("li").each(function () {
        $(this).mouseenter(function () {
            $(this).find("div").show();
        });
        $(this).mouseleave(function () {
            $(this).find("div").hide();
        });
    })

})