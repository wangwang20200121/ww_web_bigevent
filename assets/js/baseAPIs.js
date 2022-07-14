// 每次调用 $.get/ $.post/ $.ajax 的时候
// 会先调用ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Axja 提供的配置对象
$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
  options.url = "http://127.0.0.1:3000" + options.url;
});
