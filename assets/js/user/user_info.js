$(function () {
    getUserInfo();
    var form = layui.form;
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间！'
            }
        }
    });
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status == 0) {
                    var imgUrl = res.data.user_pic;
                    form.val('formUserInfo', res.data)
                    $('#AvatarSrc').prop('src',imgUrl)
                } else {
                    layer.msg('获取用户信息失败')
                }
            }
        })
    }
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        getUserInfo()
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新信息失败')
                }
                layer.msg(res.message)
                // 调用父页面重新渲染用户信息
                window.parent.getUserInfo()
            }
        })
    })
})