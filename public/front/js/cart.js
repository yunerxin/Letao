/**
 * Created by yuner on 2017/11/4.
 */
//数据渲染及下拉刷新
mui.init({
    pullRefresh : {
        container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
        down : {
            auto: true,
            callback :function () {
                $.ajax({
                    type:'get',
                    url:' /cart/queryCart',
                    success:function (data) {
                        setTimeout(function () {
                            // console.log(data);
                            result.checklogin(data);
                            $('#OA_task_2').html(template('tpl',{data:data}));
                            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                        },1000)
                    }
                });
            } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        }
    }
});
//点击删除按钮所触发的事件
$('#OA_task_2').on('tap','.btn_delete',function () {
    var id=$(this).data('id');
    mui.confirm('确认删除吗？','温馨提示',['否','是'],function (e) {
        if(e.index==1){
            $.ajax({
                type:'get',
                url:' /cart/deleteCart',
                data:{
                    id:id
                },
                success:function (data) {
                    // console.log(data);
                    result.checklogin(data);
                    if(data.success){
                        //重新刷新一次
                        mui.toast('删除成功');
                        mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                    }
                }
            });
        }else{
            mui.toast('取消操作');
        }
    })
});
//点击编辑按钮所触发的事件
$('#OA_task_2').on('tap','.btn_edit',function () {
    var data=this.dataset;
    var html=template('tpl2',data);
    html=html.replace(/\n/g,'');
    mui.confirm(html,'编辑商品',['确定','取消'],function (e) {
       if(e.index==0){
           $.ajax({
               type:'post',
               url:' /cart/updateCart',
               data:{
                   id:data.id,
                   size:$('.s.now').html(),
                   num:$('.mui-numbox-input').val()
               },
               success:function (data) {
                   // console.log(data);
                   result.checklogin(data);
                   if(data.success){
                       mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                   }
               }
           });
       }
    });
    mui(".mui-numbox").numbox();
    $('body').on('tap','.s',function () {
        $(this).addClass('now').siblings().removeClass('now');
    });
});
//订单总金额的计算
// var checked=$(':checked');
$('body').on('click','.ck',function () {
    var totle=0;
    $(':checked').each(function (i,e) {
        totle+=$(this).data('price')*$(this).data('num');
    });
    $('.totle i').html(totle);
});