$(function(){
	getCookieMessage();
	//登录获取昵称
	if($.cookie().NickName)
	{
		$("#nick").html($.cookie().NickName);
	}
	
	//清空购物车
	$(".clearcar").click(function(){
		$.cookie("json/phone.jsoncart","",{expires:-1});
		$.cookie("json/padtv.jsoncart","",{expires:-1});
		$.cookie("json/cam.jsoncart","",{expires:-1});
		$.cookie("json/note.jsoncart","",{expires:-1});
		$.cookie("cartnum","",{expires:-1});
		$(".cart_list tbody").html("");
		var str4="购物车还是空的，快去选购喜欢的商品吧！";
		$(".cart_bottom").html(str4);
	})



})
//删除功能
function delthis(obj,psrc,pid)
{
	var pnum=$.cookie("cartnum");
	pnum=parseInt(pnum)-parseInt($(obj).parent().parent().find(".pernum").html());
	$.cookie("cartnum",pnum);
	if(pnum==0)
	{
		$.cookie("cartnum",pnum,{expires:-1});
	}
	
	$(".cart_bottom b").html(parseInt($(".cart_bottom b").html())-parseInt($(obj).parent().parent().find(".perprice").html())*parseInt($(obj).parent().parent().find(".pernum").html()));
	var pobj=$.cookie(psrc+"cart");
	pobj=JSON.parse(pobj);
	delete pobj[pid];
	$.cookie(psrc+"cart",JSON.stringify(pobj));
	$(obj).parent().parent().remove();
	if($.isEmptyObject(pobj))
	{
		$.cookie(psrc+"cart","",{expires:-1});
		if(!$.cookie("json/phone.jsoncart")&&!$.cookie("json/padtv.jsoncart")&&!$.cookie("json/cam.jsoncart")&&!$.cookie("json/note.jsoncart"))
		{
			var str4="购物车还是空的，快去选购喜欢的商品吧！";
			$(".cart_bottom").html(str4);
		}
	}
}
//数量加减
function pModify(obj,psrc,pid,mod)
	{
		var pnum=$.cookie("cartnum");
		pnum=parseInt(pnum)+mod;
		$.cookie("cartnum",pnum);
		if(pnum==0)
		{
			$.cookie("cartnum",pnum,{expires:-1});
		}
		
		var pobj=$.cookie(psrc+"cart");
		pobj=JSON.parse(pobj);
		pobj[pid]+=mod;
		if(pobj[pid]==0)
		{
			delete pobj[pid];
			$(obj).parent().parent().remove();
			console.log(pobj);
			if($.isEmptyObject(pobj))
			{
				$.cookie(psrc+"cart","",{expires:-1});
				if(!$.cookie("json/phone.jsoncart")&&!$.cookie("json/padtv.jsoncart")&&!$.cookie("json/cam.jsoncart")&&!$.cookie("json/note.jsoncart"))
				{
					var str4="购物车还是空的，快去选购喜欢的商品吧！";
					$(".cart_bottom").html(str4);
				}
			}
		}
		var pstr=JSON.stringify(pobj);
		$.cookie(psrc+"cart",pstr);
		//getCookieMessage();
		$(obj).parent().parent().find(".pernum").html(pobj[pid]);
		$(obj).parent().parent().find(".pertotal").html("¥"+pobj[pid]*parseInt($(obj).parent().parent().find(".perprice").html())+".00");
		$(".cart_bottom b").html(mod*parseInt($(obj).parent().parent().find(".perprice").html())+parseInt($(".cart_bottom b").html()));
	}
function getCookieMessage()
	{
		//获取cookie数据
		var str3="";
		var totalprice=0;
		$(".cart_bottom b").html(totalprice);
		if($.cookie("json/phone.jsoncart"))
		{
			$.ajax({
				type:"get",
				url:"json/phone.json",
				async:true,
				success:function(data){
					str3="";
					totalprice=0;
					var data1=$.cookie("json/phone.jsoncart");
					data1=JSON.parse(data1);
					for(var i=0;i<data.length;i++)
					{
						if(data1[data[i].id])
						{
							str3+="<tr>"+
								"<td><img src='"+data[i].img+"' alt='' /></td>"+
								"<td>"+data[i].des+"</td>"+
								"<td>¥<span class='perprice'>"+data[i].nprice+"</span></td>"+
								"<td><button class='btn_add' onclick='pModify(this,&apos;json/phone.json&apos;,&apos;"+data[i].id+"&apos;,1)'> + </button><span class='pernum'>"+data1[data[i].id]+"</span><button class='btn_del' onclick='pModify(this,&apos;json/phone.json&apos;,&apos;"+data[i].id+"&apos;,-1)'> - </button></td>"+
								"<td class='pertotal'>¥"+data1[data[i].id]*data[i].nprice+".00</td>"+
								"<td><button class='btn btn-danger' onclick='delthis(this,&apos;json/phone.json&apos;,&apos;"+data[i].id+"&apos;)'>删除</button></td>"+
							"</tr>";
							totalprice+=(data1[data[i].id]*data[i].nprice);
						}
					}
					$(".cart_list tbody").append(str3);
					$(".cart_bottom b").html(totalprice+parseInt($(".cart_bottom b").html()));
				}
			});
		
		}
		if($.cookie("json/padtv.jsoncart"))
		{
			$.ajax({
				type:"get",
				url:"json/padtv.json",
				async:true,
				success:function(data){
					str3="";
					totalprice=0;
					var data1=$.cookie("json/padtv.jsoncart");
					data1=JSON.parse(data1);
					for(var i=0;i<data.length;i++)
					{
						if(data1[data[i].id])
						{
							str3+="<tr>"+
								"<td><img src='"+data[i].img+"' alt='' /></td>"+
								"<td>"+data[i].des+"</td>"+
								"<td>¥<span class='perprice'>"+data[i].nprice+"</span></td>"+
								"<td><button class='btn_add' onclick='pModify(this,&apos;json/padtv.json&apos;,&apos;"+data[i].id+"&apos;,1)'> + </button><span class='pernum'>"+data1[data[i].id]+"</span><button class='btn_del' onclick='pModify(this,&apos;json/padtv.json&apos;,&apos;"+data[i].id+"&apos;,-1)'> - </button></td>"+
								"<td class='pertotal'>¥"+data1[data[i].id]*data[i].nprice+".00</td>"+
								"<td><button class='btn btn-danger' onclick='delthis(this,&apos;json/padtv.json&apos;,&apos;"+data[i].id+"&apos;)'>删除</button></td>"+
							"</tr>";
							totalprice+=(data1[data[i].id]*data[i].nprice);
						}
					}
					$(".cart_list tbody").append(str3);
					$(".cart_bottom b").html(totalprice+parseInt($(".cart_bottom b").html()));
				}
			});
		}
		if($.cookie("json/cam.jsoncart"))
		{
			$.ajax({
				type:"get",
				url:"json/cam.json",
				async:true,
				success:function(data){
					str3="";
					totalprice=0;
					var data1=$.cookie("json/cam.jsoncart");
					data1=JSON.parse(data1);
					for(var i=0;i<data.length;i++)
					{
						if(data1[data[i].id])
						{
							str3+="<tr>"+
								"<td><img src='"+data[i].img+"' alt='' /></td>"+
								"<td>"+data[i].des+"</td>"+
								"<td>¥<span class='perprice'>"+data[i].nprice+"</span></td>"+
								"<td><button class='btn_add' onclick='pModify(this,&apos;json/cam.json&apos;,&apos;"+data[i].id+"&apos;,1)'> + </button><span class='pernum'>"+data1[data[i].id]+"</span><button class='btn_del' onclick='pModify(this,&apos;json/cam.json&apos;,&apos;"+data[i].id+"&apos;,-1)'> - </button></td>"+
								"<td class='pertotal'>¥"+data1[data[i].id]*data[i].nprice+".00</td>"+
								"<td><button class='btn btn-danger' onclick='delthis(this,&apos;json/cam.json&apos;,&apos;"+data[i].id+"&apos;)'>删除</button></td>"+
							"</tr>";
							totalprice+=(data1[data[i].id]*data[i].nprice);
						}
					}
					$(".cart_list tbody").append(str3);
					$(".cart_bottom b").html(totalprice+parseInt($(".cart_bottom b").html()));
				}
			});
		}
		if($.cookie("json/note.jsoncart"))
		{
			$.ajax({
				type:"get",
				url:"json/note.json",
				async:true,
				success:function(data){
					str3="";
					totalprice=0;
					var data1=$.cookie("json/note.jsoncart");
					data1=JSON.parse(data1);
					for(var i=0;i<data.length;i++)
					{
						if(data1[data[i].id])
						{
							str3+="<tr>"+
								"<td><img src='"+data[i].img+"' alt='' /></td>"+
								"<td>"+data[i].des+"</td>"+
								"<td>¥<span class='perprice'>"+data[i].nprice+"</span></td>"+
								"<td><button class='btn_add' onclick='pModify(this,&apos;json/note.json&apos;,&apos;"+data[i].id+"&apos;,1)'> + </button><span class='pernum'>"+data1[data[i].id]+"</span><button class='btn_del' onclick='pModify(this,&apos;json/note.json&apos;,&apos;"+data[i].id+"&apos;,-1)'> - </button></td>"+
								"<td class='pertotal'>¥"+data1[data[i].id]*data[i].nprice+".00</td>"+
								"<td><button class='btn btn-danger' onclick='delthis(this,&apos;json/note.json&apos;,&apos;"+data[i].id+"&apos;)'>删除</button></td>"+
							"</tr>";
							totalprice+=(data1[data[i].id]*data[i].nprice);
						}
					}
					$(".cart_list tbody").append(str3);
					$(".cart_bottom b").html(totalprice+parseInt($(".cart_bottom b").html()));
				}
			});
		}
		$(".cart_list tbody").html(str3);
		if(!$.cookie("json/phone.jsoncart")&&!$.cookie("json/padtv.jsoncart")&&!$.cookie("json/cam.jsoncart")&&!$.cookie("json/note.jsoncart"))
		{
			str3="购物车还是空的，快去选购喜欢的商品吧！";
			$(".cart_bottom").html(str3);
		}
	
	}
