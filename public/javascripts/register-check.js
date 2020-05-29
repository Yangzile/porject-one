$(function () {

    $("#registerBtn").on('click',function () {
        var passWord = $("#passWord");
        var userName = $("#userName");
        var email = $("#email");
        var checkpassword = $("#checkpassword");
        var tip = $('#tip').show();
        <!-- 对比两次输入的密码 -->
        if (passWord.val() != checkpassword.val()) {
            alert("两次密码不相同");
            tip.html("两次密码不相同");
            tip.css("color", "red");
            return false;
        }
        else if (userName.val() == '') {
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
        //密码不能为空
        else if (checkpassword.val() == '') {
            alert("第二次密码不能为空");
            tip.html("第二次密码不能为空");
            tip.css("color", "red");
            return false;
        }
        $.ajax({
            url: "/register/user",
            type: "post",
            data: {
                userName: userName.val(),
                passWord: passWord.val(),
                email: email.val()
            },
            success: function (response) {
                console.log('进入ajax');
                if (response.success) {
                    alert("注册成功前端");
                    setTimeout(function () {
                        location.href = "login.html";
                    }, 2000);
                } else {
                    alert("注册失败前端" + response.message);
                }
            }
        });


    });

})