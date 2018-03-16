  $(document).ready(function () {

            $(".headerCity>ul>li").click(function () {
                $(".headerCity>ul li").removeClass("mark");
                $(this).addClass("mark");
                $(".headerCity>ul li").css("color", "#799EEB");
                $(this).css("color", "white");


            });
            // $(".move").animate({ left: $(".mark").attr("mleft") + 'px' }, 350);
            $(".headerCity>ul>li").hover(function () {//mouseenter
                $(".move>div>span").hide();
                //alert($(this).attr("mleft"));

                $(".move").stop();
                var leftp = $(this).position().left - ($(".move").width() / 2 - $(this).width() / 2 - 20);

                $(".move").animate({ left: leftp + 'px' }, 350);
                $(this).css("color", "white");




            }, function () {
                if ($(".move").is(':hover')) {
                    //没有离开
                } else {
                    var mle = $(".mark").attr("mleft");

                    var leftp = $(".mark").position().left - ($(".move").width() / 2 - $(".mark").width() / 2 - 20);
                    //if (mle != undefined) { leftp = leftp + Number(mle); }
                    $(".move").stop();
                    $(".move").animate({ left: leftp + 'px' }, 250);
                    $(this).css("color", "#799EEB");

                }
            });
        }
);