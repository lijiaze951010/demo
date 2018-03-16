$(".bottomTab>li").hover(function(){
		$(".bottomTab>li>span").next("ul").hide();
		$(this).find("ul").show();
	},function(){
		
		$(this).find("ul").hide();
	}
	)
	