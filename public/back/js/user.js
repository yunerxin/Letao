/**
 * Created by yuner on 2017/10/30.
 */
$(function () {
    var currentPage=1;
    var pageSize=3;
     function render() {
         $.ajax({
             type: 'get',
             url: '/user/queryUser',
             data: {
                 page: currentPage,
                 pageSize: pageSize
             },
             success: function (data) {
                 var html = template('dbs', data);
                 $('tbody').html(html);

                 $("#paginator").bootstrapPaginator({
                     bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                     currentPage: currentPage,//当前页
                     totalPages: Math.ceil(data.total / pageSize),//总页数
                     size: "small",//设置控件的大小，mini, small, normal,large
                     onPageClicked: function (event, originalEvent, type, page) {
                         //为按钮绑定点击事件 page:当前点击的按钮值
                         currentPage = page;
                         render();
                     }
                 });
             }
         });
     }
    render();
    $('tbody').on('click','.btn',function () {
        $('.usermod').modal('show');
        var id=$(this).parent().data('id');
        var isDelete=$(this).parent().data('isDelete');
        isDelete=isDelete==1?0:1;
        $('.user-btn').off().on('click',function () {
            $.ajax({
                type:'post',
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function (data) {
                   $('.usermod').modal('hide');
                    render();
                }
            });
        });
    })
})