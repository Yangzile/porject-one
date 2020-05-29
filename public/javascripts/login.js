(function (window) {

    // // 相关分类
    // var tabs = document.querySelectorAll(" .asideLi");
    // var goods = document.querySelectorAll(".aside .tab-pane");
    // tabFunc(tabs, goods);
    //
    // // 商品介绍
    // var tabs1 = document.querySelectorAll(".detail .asideLi");
    // var goods1 = document.querySelectorAll(".detail .tab-pane");
    var shaoma=document.getElementById("shaoma");
    var denglu=document.getElementById("denglu");
    var index=document.getElementById("index");
    var profile=document.getElementById("profile");
    tabFunc(shaoma, denglu,index,profile);

    function tabFunc(tabs, goods,index,profile) {
        tabs.onmouseenter=function () {
            tabs.classList.add("active");
            goods.classList.remove("active");
            index.classList.add("active");
            profile.classList.remove("active");
        };
        tabs.onmouseleave=function(){
            goods.classList.add("active");
            tabs.classList.remove("active");
            index.classList.remove("active");
            profile.classList.add("active");
        };
        goods.onmouseenter=function () {
            goods.classList.add("active");
            tabs.classList.remove("active");
            index.classList.remove("active");
            profile.classList.add("active");
        };
        // for (var i = 0; i < tabs.length; i++) {
        //     tabs[i].setAttribute('index', i);
        //     tabs[i].onmouseenter = function () {
        //         for (var j = 0; j < tabs.length; j++) {
        //             tabs[j].className = '';
        //             goods[j].className = 'tab-pane'
        //         }
        //         var ind = this.getAttribute('index');
        //         console.log(goods[ind]);
        //         goods[ind].className = 'active';
        //         this.className = "active";
        //     };
        // }
    };
    window.tabFunc = tabFunc;
})(window)