/*
 * @Author: Echo974618105 974618105@qq.com
 * @Date: 2022-06-20 20:09:38
 * @LastEditors: Echo974618105 974618105@qq.com
 * @LastEditTime: 2022-06-20 20:39:54
 * @FilePath: \前端d:\Users\zmh\就业班\案例练习\git\新建文件夹\major-event-project\assets\js\article\art_pub.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
$(function() {
    var layer = layui.layer
    var form = layui.form
    initCate()
    initEditor()

    function initCate() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败')
                }
                var htmlStr = template('tpl-cate', res);
                $('[ name=cate_id]').html(htmlStr);
                form.render()

            }
        })
    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')
        // 2. 裁剪选项
    var options = {
            aspectRatio: 400 / 280,
            preview: '.img-preview'
        }
        // 3. 初始化裁剪区域
    $image.cropper(options)
    $('#btnChooseImage').on('click', function() {
        $('#file').click()
    })

    $('#file').on('change', function(e) {
        var files = e.target.files
        console.log(files);
        if (files.length == 0) {
            return
        }
        var newImgURL = URL.createObjectURL(files[0])
        console.log(1);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    var art_state = '已发布'

    $('#btnSave2').on('click', function() {
        art_state = '草稿'
    })
    $('#form-pub').on('submit', function(e) {
        e.preventDefault();
        var fd = new FormData($(this)[0])
        fd.append('state', art_state)


        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                publishArticle(fd)
            })

    })

    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            // 注意：如果向服务器提交的是 FormData 格式的数据，
            // 必须添加以下两个配置项
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                    // 发布文章成功后，跳转到文章列表页面
                location.href = '../article/art_list.html'
            }
        })
    }

})