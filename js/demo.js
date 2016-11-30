$(function(){
	$("#browser").treeview();
	$("#navigation").treeview({
		persist: "location",
		collapsed: true,
		unique: true
	});
});

$(function(){
	$(".act").click(function(){
	$("#main").load($(this).attr("name")+'.html');
	});
});

