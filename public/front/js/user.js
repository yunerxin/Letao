/**
 * Created by yuner on 2017/11/4.
 */
$(function () {
    $.ajax({
        type:'get',
        url:'/user/queryUserMessage',
        success:function (data) {
           result.checklogin(data);
            console.log(data);
            $('.phone').html(template('tpl',data));
        }
    });
    $('.logout').on('click',function () {
        console.log(12);
        mui.confirm('确定要退出系统吗？','提示',['否','是'],function (e) {
            // console.log(e);
            if(e.index==1){
                $.ajax({
                    type:'get',
                    url:'/user/logout',
                    success:function (data) {
                        console.log(data);
                        location.href='login.html';
                    }
                });
            }
        })
    });
})