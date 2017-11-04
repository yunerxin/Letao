/**
 * Created by yuner on 2017/11/4.
 */
$(function () {
    $('.login-btn').on('click',function () {
        var username=$('.username').val();
        var password=$('.password').val();
        $.ajax({
            type:'post',
            url:' /user/login',
            data:{
                username:username,
                password:password
            },
            success:function (data) {
                // console.log(data);
                if(data.error===403){
                    mui.toast(data.message);
                    return;
                };
                if(data.success){
                    var search=location.search;
                    if(search.indexOf('?jumpUrl')==-1){
                        location.href='user.html';
                    }else{
                        var a=search.replace('?jumpUrl=','');
                        location.href=a;
                    }
                }
            }
        });
    });
})