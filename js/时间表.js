$(document).on("pagecreate","#pageone",function(){
  $("a#richeng_1").on("swipeleft",function(){
    if(confirm("确定要删除此记事吗？")){
    	$("a#richeng_1").remove();
    }
  });                       
});
//写日程显示在上面
$(function(){
    $("#save").click(function(){
    var mytext=$("#form_richeng input[type='text']").val();
    var mydate=$("#form_richeng input[type='datetime-local']").val();        
   // $("<a href='#' class='ui-btn ui-corner-all ui-shadow'>mytext+mydate</a>").appendTo($("#savethis"));
    $("#save").attr("href",'时间表.html');    
    });
});

 
//左右滑动翻页效果