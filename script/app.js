/**
 * Created by liusongjin on 15-4-4.
 */
 $(function () {

	 var num=1,sNum;
    $(window).scroll(function () {
      $("#menu").find("a").removeClass("current");
      // $("#menu").find("li").removeClass("active");
        var scrollTop = $(window).scrollTop();
        var documentHeight = $(document).height();
        var windowHeight = $(window).height();
        var contentItems = $("#content").find(".item");
        var currentItem = "";
        if (scrollTop+windowHeight==documentHeight) {
            currentItem= "#" + contentItems.last().attr("id");
        }else{
            contentItems.each(function () {
                var contentItem = $(this);
                var offsetTop = contentItem.offset().top;
                if (scrollTop > offsetTop - 20) {//此处的200视具体情况自行设定，因为如果不减去一个数值，在刚好滚动到一个div的边缘时，菜单的选中状态会出错，比如，页面刚好滚动到第一个div的底部的时候，页面已经显示出第二个div，而菜单中还是第一个选项处于选中状态
                    currentItem = "#" + contentItem.attr("id");
                }
            });
        }
        if (currentItem != $("#menu").find(".current").attr("href")) {
            $("#menu").find(".current").removeClass("current");
            // $("#menu").find(".current").parent("li").removeClass("active");
      			var $menu=$("#menu"),
      			cHeight=$menu[0].clientHeight,
      			sHeight=$menu[0].scrollHeight,
      			$item=$("#menu").find("[href=" + currentItem + "]"),
      			itemIdx=$item.parent().index();
            $(".current").removeClass("current");
            // $(".current").parent("li").removeClass("active");
            // $item.parent("li").addClass('active').parent().siblings().find('.current').parent("li").removeClass('active');
            $item.addClass('current').parent().siblings().find('.current').removeClass('current');
      			if((itemIdx*48)>cHeight/2){
      				if(1==num){
      					sNum=itemIdx;
      					num=0;
      				}
      				$("#menu").scrollTop((itemIdx-sNum)*48);
      			}
        }
    });
});
