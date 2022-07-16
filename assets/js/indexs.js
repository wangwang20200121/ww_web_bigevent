$(function () {
  // 获取用户信息
  getUserInfo();
  // 退出登录
  $("#btnLogout").on("click", function () {
    console.log(1);
    //eg1
    layer.confirm(
      "确定退出登录?",
      { icon: 3, title: "提示" },
      function (index) {
        //do something
        localStorage.removeItem("token");
        location.href = "login.html";
        layer.close(index);
      }
    );
  });
});
const layer = layui.layer;

function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:3001/my/userinfo",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg("获取用户信息失败！", { icon: 2 });
      }
      console.log(res);
      renderAvstar(res.data);
    },
    // 限制强制登录
    complete: function (res) {
      let resp = res.responseJSON;
      if (resp.status === 1 && resp.message === "身份验证失败") {
        localStorage.removeItem("token");
        location.href = "login.html";
      }
    },
  });
}
// 渲染头像
function renderAvstar(user) {
  var name = user.username || user.nickname;
  $(".welcome").html(`欢迎&nbsp ${name}`);
  if (user.user_pic !== null) {
    $(".userinfo [name=imgs]").attr("src", user.user_pic).show();
    $(".hp-figure").hide();
  } else {
    $(".userinfo [name=imgs]").hide();
    var namePic = name[0].toUpperCase();
    $(".hp-figure").html(namePic);
  }
}
