$(function(){
	//登录获取昵称
	if($.cookie().NickName)
	{
		$("#nick").html($.cookie().NickName);
	}
	
	var proid=window.location.search.split("&")[0].replace("?","");
	var prosrc=window.location.search.split("&")[1];
	var str2="";
	var str5="";
	var imglen=0;
	$.ajax({
		type:"get",
		url:prosrc,
		async:true,
		success:function(data){
			for(var i=0;i<data.length;i++)
			{
				if(data[i].id==proid)
				{
					str2="<div class='zoom_small' >"+
						"<img src='"+data[i].img+"' alt='' />"+
						"<div class='zoom_shoot'></div>"+
					"</div>"+
					"<div class='zoom_big'>"+
						"<img src='"+data[i].img+"' alt='' />"+
					"</div>"+
					"<div class='product_bottom'>"+
						"<p class='product_bottom1'>"+data[i].des+"</p>"+
						"<img src='images/detail/auditing_tag.jpg' alt='' />"+
						"<div class='product_bottom2'>"+
							"<p>价 格 ： <span class='product_bottom21'>¥"+data[i].nprice+"</span></p>"+
							"<p>原 价 ： <span>¥"+data[i].fprice+"</span></p>"+
							"<p>运 费 ： <span>¥0.00</span></p>"+
						"</div>"+
						"<p class='product_bottom3'>所在地区："+data[i].add+"</p>"+
						"<a class='product_bottom4' href=''><img src='images/detail/talk_ico.png' alt='' /></a>"+
						"<p class='product_bottom5'>购买前请与商家联系，确定商品尚未售出。</p>"+
						"<div class='btn-danger btn product_bottom6'>立刻购买</div>"+
						"<div class='btn-primary btn product_bottom7'>继续购物</div>"+
					"</div>";
					//图片列表
					$.each($(data[i].img_list)[0],function(index,value){
						str5+="<li><img src='"+value+"' alt='' /></li>";
						imglen++;
					})
				}
			}
			$(".zoom").html(str2);
			$(".img_list").html(str5);
			$(".img_list li").eq(0).clone().appendTo($(".img_list"));
			$(".img_list li").eq(1).clone().appendTo($(".img_list"));
			$(".img_list li").eq(2).clone().appendTo($(".img_list"));
			$(".img_list li").eq(3).clone().appendTo($(".img_list"));
			$(".img_list li").eq(4).clone().appendTo($(".img_list"));
			$(".img_list li").eq(5).clone().appendTo($(".img_list"));
			
			//图片列表轮
			var imgNum=0;
			var imgNum1;
			var flag=0;
			var imgdis=$(".img_list li").outerWidth()+parseInt(getstyle($(".img_list li")[0],"margin-left"))+parseInt(getstyle($(".img_list li")[0],"margin-right"));
			$(".img_list").css({
				width:imgdis*(imglen+6)
			})
			var timer1=setInterval(imgmove,1000);
			$(".img_last").click(function(){
				clearInterval(timer1);
				if(imgNum<=3)
				{
					flag=1;
				}
				imgNum1=imgNum;
				imgNum=imgNum-4;
				imgmove();
				timer1=setInterval(imgmove,1000);
			})
			$(".img_next").click(function(){
				clearInterval(timer1);
				if(imgNum>=imglen)
				{
					flag=1;
				}
				imgNum1=imgNum;
				imgNum=imgNum+2;
				imgmove();
				timer1=setInterval(imgmove,1000);
			})
			function getstyle(obj,attr){
				if(obj.currentStyle){
					return obj.currentStyle[attr];//ie
				}else
				{
					return getComputedStyle(obj,false)[attr];
				}
			}
			function imgmove()
			{
				imgNum++;
				if(imgNum<=0)
				{
					if(flag==1)
					{
						$(".img_list").css({
							left:-imgdis*(imgNum1+imglen)
						})
						imgNum+=imglen;
						flag=0;
					}else
					{
						$(".img_list").css({
							left:-imgdis*imglen
						})
						imgNum+=imglen;
					}
					
				}
				if(imgNum>=imglen+3)
				{
					if(flag==1)
					{
						$(".img_list").css({
							left:-imgdis*(imgNum1-imglen)
						})
						imgNum=imgNum-imglen;
						flag=0;
					}else
					{
						$(".img_list").css({
							left:-imgdis*2
						})
						imgNum=imgNum-imglen;
					}
						
				}
				$(".img_list").stop().animate({
					left:-imgdis*imgNum
				})
			}
			
			//图片列表效果
			$(".img_list li").mouseover(function(){
				$(".zoom_small img").prop({
					src:$(this).find("img").prop("src")
				})
				$(".zoom_big img").prop({
					src:$(this).find("img").prop("src")
				})
			})
			//放大镜效果
			$(".zoom_small").mouseover(function(){
				$(".zoom_big").show();
				$(".zoom_shoot").show();
			})
			$(".zoom_small").mouseout(function(){
				$(".zoom_big").hide();
				$(".zoom_shoot").hide();
			})
			$(".zoom_small").mousemove(function(e){
				var e=e||window.event;
				var shootLeft=e.pageX-$(this).offset().left-$(".zoom_shoot").outerWidth()/2;
				var shootTop=e.pageY-$(this).offset().top-$(".zoom_shoot").outerHeight()/2;
				if(shootLeft<=0)
				{
					shootLeft=0;
				}
				if(shootLeft>=$(".zoom_small").outerWidth()-$(".zoom_shoot").outerWidth())
				{
					shootLeft=$(".zoom_small").outerWidth()-$(".zoom_shoot").outerWidth();
				}
				if(shootTop<=0)
				{
					shootTop=0;
				}
				if(shootTop>=$(".zoom_small").outerHeight()-$(".zoom_shoot").outerHeight())
				{
					shootTop=$(".zoom_small").outerHeight()-$(".zoom_shoot").outerHeight();
				}
				$(".zoom_shoot").css({
					"left":shootLeft,
					"top":shootTop
				})
				var perLeft=shootLeft/($(".zoom_small").outerWidth()-$(".zoom_shoot").outerWidth());
				var perTop=shootTop/($(".zoom_small").outerHeight()-$(".zoom_shoot").outerHeight());
				$(".zoom_big img").css({
					"left":perLeft*($(".zoom_big").outerWidth()-$(".zoom_big img").outerWidth()),
					"top":perTop*($(".zoom_big").outerHeight()-$(".zoom_big img").outerHeight())
				})
			})
			
			//快上车，购物车
			var cartnum=$.cookie("cartnum")||0;
			$(".shopcar2").html(cartnum);
			$(".product_bottom6").click(function(){
				cartnum++;
				$(".shopcar2").html(cartnum);
				$.cookie("cartnum",cartnum);
				var cart;
				if($.cookie(prosrc+"cart"))
				{
					cart=JSON.parse($.cookie(prosrc+"cart"));
				}else
				{
					cart={};
				};
				var pronum=cart[proid]||0;
				pronum++;
				cart[proid]=pronum;
				var strcart=JSON.stringify(cart);
				$.cookie(prosrc+"cart",strcart);
			})
			
			//返回继续购物
			
			$(".product_bottom7").click(function(){
				if(prosrc=="json/phone.json")
				{
					window.location="phone.html";
				}
				if(prosrc=="json/note.json")
				{
					window.location="note.html";
				}
				if(prosrc=="json/padtv.json")
				{
					window.location="padtv.html";
				}
				if(prosrc=="json/cam.json")
				{
					window.location="cam.html";
				}
			})

		}
	});
	
})



