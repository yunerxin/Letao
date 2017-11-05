/**
 * Created by yuner on 2017/11/5.
 */
$(function () {
   // 验证码校验
   $('.vcode').on('click',function () {
       if($(this).hasClass('now')){
           return;
       };
       $(this).addClass('now').html('正在发送中...');
       $this=$(this);
       $.ajax({
           type:'get',
           url:'/user/vCode',
           success:function (data) {
               console.log(data.vCode);
               var n=60;
               var timer=setInterval(function () {
                   n--;
                   // console.log(n);
                   $this.html(n+'秒重新发送');
                   if(n<=0){
                       $this.html('再次发送').removeClass('now');
                       clearInterval(timer);
                   }
               },1000)
           }
       });
   });
    // 点击注册按钮
    $('.register-btn').on('click',function () {
        var username=$('.username').val();
        var password=$('.password').val();
        var qrpassword=$('.qrpassword').val();
        var mobile=$('.mobile').val();
        var vCode=$('.vCode').val();
        if(username==""){
            mui.toast('请输入用户名');
            return;
        };
        if(password==""){
            mui.toast('请输入密码');
            return;
        };
        if(qrpassword==""){
            mui.toast('请再次输入密码');
            return;
        };
        if(password!=qrpassword){
            mui.toast('两次密码输入不一致');
            return;
        }
        if(!/^1[34578]\d{9}$/.test(mobile)){
            mui.toast('请输入有效的手机号');
            return;
        };
        if(!/^\d{6}$/.test(vCode)){
            mui.toast('请输入有效的验证码');
            return;
        };
        $.ajax({
            type:'post',
            url:'/user/register',
            data:{
                username:username,
                password:password,
                mobile:mobile,
                vCode:vCode
            },
            success:function (data) {
                console.log(data);
                if(data.success){
                    location.href='login.html'
                }else{
                    mui.toast(data.message);
                }
            }
        });
    });
})