///*处理位置*/
//window.onload=function(){
//	waterfall('main','box');
//	var dataInt={"data":[{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'}]};
//	window.onscroll=function(){
//		if(checkScrollSlide){
//			//将数据块渲染到页面的尾部
//			//先遍历json
//			var oParent=document.getElementById('main');
//			for(var i=0;i<dataInt.data.length;i++){
//				var oBox=document.createElement('div');
//				oBox.className='box';
//				oParent.appendChild(oBox);
//				var oPic=document.createElement('div');
//				oPic.className='pic';
//				oBox.appendChild(oPic);
//				var oImg=document.createElement('img');
//				oImg.src="images/"+dataInt.data[i].src;
//				oPic.appendChild(oImg);
//			}
//			waterfall('main','box');
//		}
//	}
//}
//function waterfall(parent,box){ 
//	//将main下的所有.box元素取出来，
//	var oParent=document.getElementById(parent);  //根据class获取元素，封装成下边的函数
//	//接收结果，即.box
//	var oBoxs=getByClass(oParent,box);
//	//console.log(oBoxs.length);
//	
//	
//	//计算整个页面的列数,页面宽/box宽
//	var oBoxW=oBoxs[0].offsetWidth;  /*获取一个box的宽为202px*/
//	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);   
//	//console.log(cols);  /*取整后得到6列*/
//	oParent.style.cssText="width:"+oBoxW*cols+'px; margin:0 auto';  //获取main的宽，并居中,这样页面缩小后还是6列
//	
//	
//	//第二行的第一张图片放在第一行最短的图片下面
//	var hArr=[];  //存放每一列高度的数组
//	for(var i=0;i<oBoxs.length;i++){
//		if(i<cols){
//			hArr.push(oBoxs[i].offsetHeight); 
//		}
//		else{
//			var minH=Math.min.apply(null,hArr);
//			var index=getMinhIndex(hArr,minH);//再封装一个函数
//			oBoxs[i].style.position='absolute';
//			oBoxs[i].style.top=minH+'px';
//			//oBoxs[i].style.left=oBoxW*index+'px';
//			oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
//			hArr[index]+=oBoxs[i].offsetHeight;
//		}
//	}
//	//console.log(hArr);
//}
//
//function getByClass(parent,clsName){
//	var boxArr=new Array(), //用来存储获取到的所有.box元素，是一个数组
//	oElements=parent.getElementsByTagName('*');
//	for(var i=0;i<oElements.length;i++){  //遍历
//		if(oElements[i].className==clsName){
//			boxArr.push(oElements[i]);   
//		}	
//	}
//	return boxArr;
//}
//function getMinhIndex(arr,val){
//	for(var i in arr){
//		if(arr[i]==val){
//			return i;
//		}
//	}
//}
////检测是否具备了滚动条加载数据库的条件
//function checkScrollSlide(){
//	var oParent=document.getElementById('main');
//	var oBoxs=getByClass(oParent,'box');
//	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
//	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
//	var height=document.body.clientHeight||document.documentElement.clientHeight;
//	return(lastBoxH<scrollTop+height)?true:false;
//}


//法二、用jquery实现瀑布流
$(window).on('load',function(){
	waterfall();     //jQuery不用传递参数
	var dataInt={"data":[{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'}]};
	$(window).on('scroll',function(){
		if(checkScrollSlide){
			$.each(dataInt.data, function(key,value) { //key每个值的索引，value每个值
				//console.log(value);
				var oBox=$('<div>').addClass('box').appendTo($('#main'));
				var oPic=$('<div>').addClass('pic').appendTo($(oBox));
				$('<img>').attr('src','images/'+$(value).attr('src')).appendTo($(oPic));
			})
			waterfall();
		}
	})
})
function waterfall(){
	var $boxs=$("#main>div");
	var w=$boxs.eq(0).outerWidth(); /*获取.box的一个宽度*/
	var cols=Math.floor($(window).width()/w); //获取列数
	$("#main").width(w*cols).css("margin",'0 auto'); //设置main的宽度并居中
	var hArr=[];  //
	$boxs.each(function(index,value){  //遍历所有的.box
		var h=$boxs.eq(index).outerHeight();   //每一张图片的高度
		if(index<cols){  //操作前六张图片
			hArr[index]=h; //前六张图片的高度放进hArr数组中
		}else{
		var minH=Math.min.apply(null,hArr);//求图片高度的最小值
		var minHIndex=$.inArray(minH,hArr); //求最小值的索引  ，$.inArray判断一个值在数组中出现的索引，（判断谁，在哪里判断）
		//console.log(value);
		$(value).css({  //设置第七张往后每张图片的位置
			'position':'absolute',
			'top':minH+'px',
			'left':minHIndex*w+'px'
		});
		hArr[minHIndex]+=$boxs.eq(index).outerHeight(); //很重要的一步，改变数组的值
		}
	});
}
function checkScrollSlide(){
	var $lastBox=$('#main>div').last();
	var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);//顶部到最后一个块一半的高度
	var scrollTop=$(window).scrollTop();  //页面滚走的距离
	var documentH=$(window).height(); //浏览器窗口可视区域的高度
	return (lastBoxDis<scrollTop+documentH)?true:false;
}
