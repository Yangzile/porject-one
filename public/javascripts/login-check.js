$(function () {

    $("#login-btn").on('click',function () {
        var passWord = $("#passWord");
        var userName = $("#userName");


        if (userName.val() == '') {
            alert("账号不能为空");
            tip.html("账号不能为空");
            tip.css("color", "red");
            return false;
        }
        //密码不能为空
        else if (passWord.val() == '') {
            alert("密码不能为空");
            tip.html("密码不能为空");
            tip.css("color", "red");
            return false;
        }

        $.ajax({
            url: "/login",
            type: "post",
            data: {
                userName: userName.val(),
                passWord: passWord.val(),
            },
            success: function (response) {
                console.log('进入ajax');
                if (response.success) {
                    alert("登录成功前端");
                    setTimeout(function () {
                        location.href = "/";
                    }, 2000);
                } else {
                    alert("登录失败前端: " + response.message);
                    // return false;
                }
            }
        });


    });

})