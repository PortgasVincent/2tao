function getdata(jsrc)
{
	$.ajax({
		type:"get",
		url:jsrc,
		async:true,
		success:function(data){
			var pagenum=10;
			var totalpage=Math.ceil(data.length/pagenum);
			var str1="";
			var n=1;
			addData(n);
//			console.log(totalpage);
			for(var j=0;j<totalpage;j++)
			{
				str1+="<div>"+(j+1)+"</div>";
			}
			$(".content_index_num").html(str1);
			$(".content_index_num div").click(function(){
				n=parseInt($(this).html());
				addData(n);
			})
			$(".first_page").click(function(){
				n=1;
				addData(n);
			})
			$(".last_page").click(function(){
				n--;
				if(n==0)
				{
					alert("已经是第一页！");
					n=1;
				}else
				{
					addData(n);
				}
			})
			$(".next_page").click(function(){
				n++;
				if(n>totalpage)
				{
					alert("已经是最后一页！");
					n=totalpage;
				}else
				{
					addData(n);
				}
			})
			$(".end_page").click(function(){
				n=totalpage;
				addData(n);
			})
			function addData(n)
			{
				
				
				var str="";
				for(var i=(n-1)*pagenum;i<Math.min(n*pagenum,data.length);i++)
				{
					str+="<li class='col-md-2'><a href='detail.html?"+data[i].id+"&"+jsrc+"'><img src='"+data[i].img+"' alt='' /><div class='content11'><p>"+data[i].des+"</p><h5>原价："+data[i].fprice+"<span>运费："+data[i].pprice+"</span></h5><h4>现价："+data[i].nprice+"<span>"+data[i].add+"</span></h4><h3>已售："+data[i].sell+"件|"+data[i].talk+"评论</h3></div></a></li>";
				}
				$(".content1").html(str);
			}
			
		}
	});
}
