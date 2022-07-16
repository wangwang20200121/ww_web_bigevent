/*
 * @Author: Echo974618105 974618105@qq.com
 * @Date: 2022-06-20 20:09:38
 * @LastEditors: Echo974618105 974618105@qq.com
 * @LastEditTime: 2022-06-20 20:27:18
 * @FilePath: \前端d:\Users\zmh\就业班\案例练习\git\新建文件夹\major-event-project\assets\js\baseAPI.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 每次调用$.get或者$.post()或$.ajax()的时候会先调用ajaxPrefilter函数
// 在这个函数中，可以拿到我们给Ajax提供的配置之对象
// $.ajaxPrefilter(function(options) {
//     options.url = 'http://www.liulongbin.top:3007' + options.url
//     if (options.url.indexOf(/my/ !== -1)) {
//         options.headers = {
//             Authorization: localStorage.getItem('token') || ''
//         }
//     }
//     options.complete = function(res) {
//         if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
//             localStorage.removeItem("token")
//             location.href = '../login.html'
//         }
//     }
// })
