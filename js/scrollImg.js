function scrollImg(src,box,bannerbox,abox,prev,next)
{
	//json必须直接是路径["img/01.jpg","img/02.jpg","img/03.jpg"]
	//src  json资源路径   box  外层div  bannerbox 图的ul  abox角标的div prev上一张的角标      next下一张的角标
	$.get(src,function(data){
		$.each(data, function(index,value) {
			$("<li><a href='' style='background:url("+value+")' ></li>").appendTo(bannerbox);
			$("<a>").appendTo(abox);
		});
		bannerbox.find("li").first().clone().appendTo(bannerbox);
		var $ul=bannerbox;
		var $li=bannerbox.find("li");
		var perWidth=$li.outerWidth();
		var len=$li.length;
		$ul.css("width",perWidth*len);
		$li.css("width",perWidth);
		//abox.find("a").css("width",abox.outerWidth()/(len-1)-1);
		//第一个和最后一个因为是一样的是同一个下标   刚好分五份的话有margin值会放不开 再减去一像素的间距
		var i=0;
		abox.find("a").first().addClass("cur");
		var timer=setInterval(move,2000);
		function move()
		{
			//console.log("a");
			i++;
			if(i==len-1)
			{
				abox.find("a").eq(0).addClass("cur").siblings().removeClass();
			}
			if(i==len)
			{
				i=1;
				$ul.css("margin-left",0);
			}
			if(i==-1)
			{
				i=len-2;
				$ul.css("margin-left",-perWidth*(len-1));
			}
			$ul.stop().animate({"margin-left":-perWidth*i});
			abox.find("a").eq(i).addClass("cur").siblings().removeClass();
		}
		box.mouseover(function(){
			prev.show();
			next.show();
		})
		box.mouseout(function(){
			prev.hide();
			next.hide();
		})
		prev.click(function(){
			clearInterval(timer);
			i=i-2;
			move();
			timer=setInterval(move,2000);
		})
		next.click(function(){
			clearInterval(timer);
			move();
			timer=setInterval(move,2000);
		})
		abox.find("a").mouseenter(function(){
			clearInterval(timer);
			i=$(this).index()-1;
			//console.log($(this).index())
			move();
			timer=setInterval(move,2000);
		})
		
		
	})
}
