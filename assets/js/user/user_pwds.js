$(function () {
  layui.use("form", function () {
    // 自定义校验规则
    var form = layui.form;
    // 校验规则
    form.verify({
      confirmPass: function (value) {
        var pwd = $(".layui-form-item [name=newPwd]").val();
        if (pwd !== value) return "提示：两次输入密码不一致！";
      },
      identical: function (value) {
        var pwd = $(".layui-form-item [name=oldPwd]").val();
        if (pwd === value) return "提示：新密码不能和旧密码一样！";
      },
      //我们既支持上述函数式的方式，也支持下述数组的形式
      //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
      pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    });
  });
});
// 提交修改密码的表单
$(".layui-form").submit(function (e) {
  e.preventDefault();
  let pwdVal = $("#oldPwd").val();
  let newPwd = $("#newPwd").val();
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:3001/my/password",
    // 发送请求头
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    data: {
      pwdVal: pwdVal,
      newPwd: newPwd,
    },
    success: function (res) {
      layui.use(["layer", "form"], function () {
        layer = layui.layer;
        form = layui.form;
        if (res.status !== 0) return layer.msg(res.message, { icon: 2 });
        $(".layui-form")[0].reset();
        layer.msg("修改密码成功", { icon: 1 });
      });
    },
  });
});
