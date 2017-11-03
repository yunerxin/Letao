/**
 * Created by yuner on 2017/11/2.
 */
mui('.mui-scroll-wrapper').scroll({
    indicators:false
});
// 拿到地址栏中的key值，把其放到input标签中，同时渲染出相应的商品
var currentPage=1;
var pageSize=20;
var data={
    proName:'',
    brandId:'',
    price:'',
    num:'',
    page:currentPage,
    pageSize:pageSize
};
data.price = '';
data.num = '';
 function render(data){
    $.ajax({
        type:'get',
        url:'/product/queryProduct',
        data:data,
        success:function (data) {
            // console.log(data);
            $('.product').html(template('tpl',data));
        }
    });
 };
var value=result.getresult('key');
$('.search_text').val(value);
data.proName=value;
render(data);
$('.search_btn').on('click',function () {
    var v=$(this).prev().val().trim();
    if(v===''){
        mui.alert('亲，你想搜啥');
        return;
    };
    data.proName=v;
    render(data);
});
//排序问题
$('.bd').on('click',function () {
    if($(this).hasClass('orange')){
        $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    }else {
        $(this).addClass('orange').siblings().removeClass('orange');
        $(this).find('i').addClass('fa-angle-up').removeClass('fa-angle-down');
    }
    var type=$(this).data('type');
    var value=$(this).find('i').hasClass('fa-angle-down')?2:1;
    data[type]=value;
    render(data);
});