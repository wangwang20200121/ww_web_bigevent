$(function () {
  var $image = $("#image");
  // 配置选项
  const options = {
    // 横纵比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
    // 背景颜色
    background: "#fcfffc",
  };
  // 初始化图片上传
  $image.cropper(options);

  $(".uploading").on("click", function () {
    $("#file").click();
  });
  // 为文件选择框绑定 change 事件
  $("#file").on("change", function (e) {
    // 获取用户选择的文件
    var filelist = e.target.files;
    if (filelist.length === 0) {
      layui.use(["layer"], function () {
        layer = layui.layer;
        return layer.msg("请选择照片！");
      });
    }

    // 1. 拿到用户选择的文件
    var file = e.target.files[0];
    // 2. 将文件，转化为路径
    var imgURL = URL.createObjectURL(file);
    // 3. 重新初始化裁剪区域
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", imgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
    console.log($image);
  });
  //为“确定”按钮绑定点击事件
  $("#btnUpload").on("click", function () {
    //1.拿到用裁剪之后的头像

    var dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    //2.调用接口，将头像上传到服务器
    $.ajax({
      method: "POST",
      url: "http://127.0.0.1:3001/my/updata/avatar",
      data: {
        avatar: dataURL,
      },
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      success: function (res) {
        if (res.status !== 0) {
          layui.use(["layer"], function () {
            layer = layui.layer;
            return layer.msg("更换头像失败");
          });
        }
        layui.use(["layer"], function () {
          layer = layui.layer;
          return layer.msg("更换头像成功");
        });

        window.parent.getUserInfo();
      },
    });
  });
});
