
$(function () {

    // 相关分类
    var tabs = document.querySelectorAll(".aside .asideLi");
    var goods = document.querySelectorAll(".aside .tab-pane");
    tabFunc(tabs, goods);

    // 商品介绍
    var tabs1 = document.querySelectorAll(".detail .asideLi");
    var goods1 = document.querySelectorAll(".detail .tab-pane");
    tabFunc(tabs1, goods1);


    function tabFunc(tabs, goods) {
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].setAttribute('index', i);
            tabs[i].onmouseenter = function () {
                for (var j = 0; j < tabs.length; j++) {
                    tabs[j].className = 'asideLi';
                    goods[j].className = 'tab-pane';
                }
                var ind = this.getAttribute('index');
                goods[ind].className = 'active';
                this.className = "active";
            };
        }
    };

/*    function tab(tabs,goods){
        tabs.find("li").each(function () {
            $(this).onmouseenter(function () {
                $(this).addClass("active").siblings().removeClass("active");
                goods.
            })
        })
    }*/

$('#addcart').click(function () {
        var listName=$('#biaoti').html();
        var number=$('.itxt').val();
        var userName = $('#loginname').html();
        if(userName!="你好！，请登录" && number!= 0){
                $.ajax({
                    url: "/cart/addcart",
                    type: "get",
                    data: {
                        listName: listName,
                        number:parseInt(number),
                    },
                    success: function (response) {
                        if (response.success) {
                            alert("添加成功前端");
                            // setTimeout(function () {
                            //     location.href = "/";
                            // }, 2000);
                        } else {
                            alert("添加失败前端: " + response.message);
                        }
                    }
                });
        }

    })

$('#specification').find("dd").find("a").each(function () {
    $(this).click(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
    })
})



 $("#plus").click(function () {
        var count = parseFloat($(this).siblings("input").val());
        console.log(count);
        $(this).siblings("input").prop("value",++count);
    });
$("#mins").click(function () {
    var count = parseFloat($(this).siblings("input").val());
   if(count>1){
      $(this).siblings("input").prop("value",--count);
   }else {
       alert("不能再少了！");
   }

})







})