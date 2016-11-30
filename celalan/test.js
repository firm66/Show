$(function () {
    $("ul#celalan_ul ul").hide();
    $("ul#celalan_ul>.li").bind('click', function () {
        $(this).addClass("myclick").find("ul").slideToggle()
            .parent().siblings().removeClass("myclick").find("ul").slideUp();
    });
    $("ul#celalan_ul ul").click(function () {
        return false; //避免按ul里的链接也展开闭合
    })
});
$(function () {
        var open = true;
    $("#celalan_span").click(function () {
        $("#celalan_left").animate({width: 'toggle'}); //左右交替滑动
        if (open) {
            $("#celalan_main").animate({width: '98%'});
            open = false;
        }
        else {
            $("#celalan_main").animate({ width: '80%'});
            open = true;
        }
    });
});
$(function(){
    //$("#celalan_main").load('aa.html');
    $("li.acts").click(function(){
        $("#celalan_main").load('celalan/'+$(this).find("a").text()+'.html');
    });
});