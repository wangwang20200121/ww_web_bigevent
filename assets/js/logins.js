$(function () {
  // 去注册
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  // 去登陆
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  // 自定义校验规则
  var form = layui.form;
  // 友情提示框
  var layer = layui.layer;

  // 校验规则
  form.verify({
    confirmPass: function (value) {
      var pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) return "提示：两次输入密码不一致！";
    },
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  });

  // 监听注册表单的提交事件;
  $("#form-reg").on("submit", function (e) {
    // console.log($("#form-reg").val());
    // 阻止默认提交事件;
    e.preventDefault();
    $.post(
      "api/reguser",
      {
        username: $("#form-reg [name=username]").val(),
        password: $("#form-reg [name=password]").val(),
      },
      function (res) {
        console.log(res);
        if (res.status !== 0) {
          console.log(res);
          // return console.log("注册失败了" + res.message);
          return layer.msg("注册失败了" + res.message, { icon: 2 });
        }
        layer.msg(res.message + "，请登录", { icon: 1 });
        // console.log("注册成功，请登录", res);
        // 清空表单
        $("#form-reg")[0].reset();
        // 注册成功后，跳转到登录页面;
        $("#link_login").click();
      }
    );
  });
  // 登录
  $("#form-login").submit(function (e) {
    const url = "/api/login";
    e.preventDefault();
    $.ajax({
      type: "POST",
      url,
      data: {
        username: $("#form-login [name=username]").val(),
        password: $("#form-login [name=password]").val(),
      },
      success: function (response) {
        console.log(response);
        if (response.status !== 0) {
          return layer.msg(response.message, { icon: 2 });
        }
        layer.msg(response.message, { icon: 1 });
        // 保存token到本地存储
        localStorage.setItem("token", response.token);
        // 清空表单
        $("#form-login")[0].reset();
        // 登录成功后，跳转到首页;
        location.href = "./index.html";
      },
    });
  });
});
