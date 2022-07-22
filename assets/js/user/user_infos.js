$(function () {
  layui.use("form", function () {
    let form = layui.form;
    form.verify({
      nickname: function (value) {
        if (value.length > 6) {
          return "昵称长度不能超过6个字符";
        }
      },
    });
  });
  initUserInfo();
});
// 获取用户信息
function initUserInfo() {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:3001/my/userinfo",
    // 返回token
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    success: function (res) {
      layui.use(["layer"], function () {
        layer = layui.layer;
        if (res.status !== 0) return layer.msg("获取用户信息失败", { icon: 2 });
        let data = res.data;
        $(".layui-form [name=username]").val(data.username);
        $(".layui-form [name=nickname]").val(data.nickname);
        $(".layui-form [name=email]").val(data.email);
        // return layer.msg("获取用户信息成功", { icon: 1 });
      });
    },
  });
}
// 重置表单
$("#deletFrom").on("click", function (e) {
  e.preventDefault();
  initUserInfo();
});
// 修改用户信息
$(".layui-form").on("submit", function (e) {
  e.preventDefault();
  let formData = $(this).serialize();
  // 获取id
  // let id = $(this).attr("data-id");
  console.log(formData);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:3001/my/userinfo",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    data: formData,
    success: function (res) {
      layui.use(["layer"], function () {
        layer = layui.layer;
        if (res.status !== 0) return layer.msg("修改用户信息失败", { icon: 2 });
        layer.msg("修改用户信息成功", { icon: 1 });
        window.parent.getUserInfo();
      });
    },
  });
});
