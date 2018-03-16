$("#loadEnvironmentDatabase").load("/html/vectorData.html");
    $(".left1 > ul > li > ul > li > span").click(function () {
        var ID = '';
        $(".left1 > ul > li > ul > li > span").removeClass("active");
        $(this).addClass("active");

    });
    $(".left1 > ul > li > span").click(function () {
//  $(".left1 > ul > li > ul").slideUp();
//  $(this).next("ul").slideDown();
  $(this).next("ul").slideToggle();
    });