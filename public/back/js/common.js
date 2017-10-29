/**
 * Created by yuner on 2017/10/29.
 */
$(function () {
    //判断是否登录，阻止跳墙访问
    if(location.href.indexOf('login.html')<0){
        $.ajax({
            type:'get',
            url:'/employee/checkRootLogin',
            success:function (data) {
               if(data.error===400){
                   location.href='login.html'
               }
            }
        })
    }
    //显示进度条
    $(document).ajaxStart(function () {
        NProgress.start();
    })
    $(document).ajaxStop(function () {
        NProgress.done();
    })
    //分类出现与否
    $('.flei').prev().on('click',function () {
        // console.log(123);
        $('.flei').slideToggle();
    })
   // 点击menu
   $('.header .pull-left').on('click',function () {
       $('.aside').toggleClass('click');
       $('.main').toggleClass('click');
   })
    // 退出登录
    $('.header .pull-right').on('click',function () {
        $('.dropmod').modal('show');
    })
    // 点击确定退出按钮
    $('.logout-btn').on('click',function () {
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            success:function (data) {
                if(data.success){
                    window.location.href='login.html';
                }
            }
        })
    })
})