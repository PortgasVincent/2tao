
$(document).ready(function(){
//获取数据
	//猜你喜欢部分
	$.ajax({
		type:"get",
		url:"json/note.json",
		async:true,
		success:function(data){
			var str5="";
			for(var i=0;i<6;i++)
			{
				str5+="<li class='col-md-2'>"+
							"<a href='detail.html?"+data[i].id+"&json/note.json'>"+
								"<img src='"+data[i].img+"' alt='"+data[i].des+"' />"+
								"<p>"+data[i].des+"</p>"+
							"</a>"+
							"<b>原价："+data[i].fprice+"</b>"+
							"<h5>现价："+data[i].nprice+"</h5>"+
						"</li>";
			}
			$(".part12").html(str5);
		}
	});
	//手机通讯部分获取数据
	$.ajax({
		type:"get",
		url:"json/phone.json",
		async:true,
		success:function(data){
			var str6="";
			for(var i=0;i<8;i++)
			{
				str6+="<li class='col-md-3'>"+
						"<a href='detail.html?"+data[i].id+"&json/phone.json'>"+
							"<img src='"+data[i].img+"' alt='"+data[i].des+"' />"+
							"<p>"+data[i].des+"</p>"+
						"</a>"+
						"<b>原价："+data[i].fprice+"</b>"+
						"<h5 class='m_g'>现价："+data[i].nprice+"</h5>"+
					"</li>";
			}
			$(".getphonedata").html(str6);
		}
	});
	//笔记本部分获取数据
	$.ajax({
		type:"get",
		url:"json/note.json",
		async:true,
		success:function(data){
			var str6="";
			for(var i=0;i<8;i++)
			{
				str6+="<li class='col-md-3'>"+
						"<a href='detail.html?"+data[i].id+"&json/note.json'>"+
							"<img src='"+data[i].img+"' alt='"+data[i].des+"' />"+
							"<p>"+data[i].des+"</p>"+
						"</a>"+
						"<b>原价："+data[i].fprice+"</b>"+
						"<h5 class='m_g'>现价："+data[i].nprice+"</h5>"+
					"</li>";
			}
			$(".getnotedata").html(str6);
		}
	});
	//摄影摄像部分获取数据
	$.ajax({
		type:"get",
		url:"json/cam.json",
		async:true,
		success:function(data){
			var str6="";
			for(var i=0;i<8;i++)
			{
				str6+="<li class='col-md-3'>"+
						"<a href='detail.html?"+data[i].id+"&json/cam.json'>"+
							"<img src='"+data[i].img+"' alt='"+data[i].des+"' />"+
							"<p>"+data[i].des+"</p>"+
						"</a>"+
						"<b>原价："+data[i].fprice+"</b>"+
						"<h5 class='m_g'>现价："+data[i].nprice+"</h5>"+
					"</li>";
			}
			$(".getcamdata").html(str6);
		}
	});
	//平板电视部分获取数据
	$.ajax({
		type:"get",
		url:"json/padtv.json",
		async:true,
		success:function(data){
			var str6="";
			for(var i=0;i<8;i++)
			{
				str6+="<li class='col-md-3'>"+
						"<a href='detail.html?"+data[i].id+"&json/padtv.json'>"+
							"<img src='"+data[i].img+"' alt='"+data[i].des+"' />"+
							"<p>"+data[i].des+"</p>"+
						"</a>"+
						"<b>原价："+data[i].fprice+"</b>"+
						"<h5 class='m_g'>现价："+data[i].nprice+"</h5>"+
					"</li>";
			}
			$(".getpadtvdata").html(str6);
		}
	});
//logo部分
	$(".logo_top a").click(function(){
	$(this).css({"background":"#ff2832","color":"#fff"}).siblings().css({"color":"#ff2832","background":"none"});
	})
//	轮播图
	var timer1;
	scrollImg("json/banner1.json",$(".banner_center_top"),$(".banner_center_top1"),$(".banner_center_top2"),$(".banner_center_top_prev"),$(".banner_center_top_next"),timer1);
	var timer2;
	scrollImg("json/banner2.json",$(".banner_right_top"),$(".banner_right_top1"),$(".banner_right_top2"),$(".banner_right_top_prev"),$(".banner_right_top_next"),timer2);
	//第三个轮播。。。
	
	var timer3=setInterval(timer3move,2000);
	function timer3move()
	{
//		if(i==1)
//		{
			$(".banner_right_center1 li:first-child").animate({"margin-left":"-274px"},function(){
			$(this).appendTo($(this).parent());
			$(this).css("margin-left",0);
			});
		//}
//		if(i==-1)
//		{
//			$(".banner_right_center1 li:last-child").prependTo($(".banner_right_center1"));
//			$(".banner_right_center1 li:first-child").css("margin-left","-274px");
//			$(".banner_right_center1 li:first-child").animate({"margin-left":0});
//		}
		
	}
	$(".banner_right_center_prev").click(function(){
		clearInterval(timer3);
		$(".banner_right_center1 li:last-child").prependTo($(".banner_right_center1"));
			$(".banner_right_center1 li:first-child").css("margin-left","-274px");
			$(".banner_right_center1 li:first-child").animate({"margin-left":0});
		setTimeout(timer3=setInterval(timer3move,2000));
	})
	$(".banner_right_center_next").click(function(){
		clearInterval(timer3);
		timer3move();
		setTimeout(timer3=setInterval(timer3move,2000));
	})
	function timer4move()
	{
		$(".banner_right_bottom1 li:first-child").animate({"margin-top":"-253px"},function(){
			$(this).appendTo($(this).parent());
			$(this).css({"margin-top":0});
		})
	}
	var timer4=setInterval(timer4move,2000);
	//logo跟随页面
	$(document).scroll(function(){
		var disscroll=document.documentElement.scrollTop||document.body.scrollTop;
		//console.log($(".logo").css("height"));
		if(disscroll>=parseInt($(".logo").css("height")))
		{
			$(".logo").css({"position":"fixed","left":0,"top":0})
		}
		if(disscroll<=parseInt($(".logo").css("height")))
		{
			$(".logo").css({"position":"relative"})
		}
	})
	//scrollbox
	$(".scrollbox11").mousedown(function(){
		//alert(1)
		$(this).css({"background":"url(images/bottom/messbtn.png) no-repeat -38px 0"})
	})
	$(".scrollbox11").click(function(){
		$(".scrollbox").css({"bottom":"-282px"});
		$(".scrollbox11").css({"background":"none"});
	})
	
	//登录获取昵称
	if($.cookie().NickName)
	{
		$("#nick").html($.cookie().NickName);
	}else
	{
		var username=window.location.search.replace("?","");
		console.log(username)
		if(username!="")
		{
			$("#nick").html(username);
		}
		$.cookie("NickName",username);
	}
	
	
	
	
	
	
	
	
	
	
})

