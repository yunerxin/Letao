/**
 * Created by yuner on 2017/11/3.
 */
mui('.mui-scroll-wrapper').scroll({
    indicators:false
});

// console.log(result.getresult('productId'));
//页面渲染
var id=result.getresult('productId');
$.ajax({
    type:'get',
    url:'/product/queryProductDetail',
    data:{
        id:id
    },
    success:function (data) {
        // console.log(data);
        var arr=data.size.split('-');
        var newarr=[];
        for(var i=arr[0];i<arr[1];i++){
            newarr.push(i);
        };
        data.newarray=newarr;
        $('.mui-scroll').html(template('tpl',data));
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
        });
        mui(".mui-numbox").numbox();
    }
});
//加入购物车
var size='';
$('.mui-scroll').on('click','.p',function () {
    size=$(this).val();
    $(this).addClass('now').siblings().removeClass('now');
});
$('.add-cart').on('click',function () {
    var num=$('.mui-numbox-input').val();
    $.ajax({
        type:'post',
        url:' /cart/addCart',
        data:{
            productId:id,
            size:size,
            num:num
        },
        success:function (data) {
            // console.log(data);
            if(size==""){
                mui.toast('请选择尺码');
                return;
            }
            if(data.error===400){
                location.href='login.html?jumpUrl='+location.href;
            }else {
                mui.toast('加入购物车成功')
            }
        }
    });
});