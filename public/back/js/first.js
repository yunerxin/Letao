/**
 * Created by yuner on 2017/10/31.
 */
$(function () {
    var currentPage=1;
    var pageSize=3;
    //渲染及分页
    function render() {
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (data) {
                $('tbody').html(template('tpl',data));
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
                })
            }
        });
    }
    render();
    // 添加一级分类
    $('.add-btn').on('click',function () {
        $('.addmod').modal('show');
    });
    //表单验证

    $('form').bootstrapValidator({
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:'用户名不能为空'
                    }
                }
            }
        }
    });
    //表单验证成功事件
    $('#form').on('success.form.bv',function (e) {
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:$('form').serialize(),
            success:function (data) {
                console.log(data);
                if(data.success){
                    $('form')[0].reset();
                    $('form').data('bootstrapValidator').resetForm();
                    currentPage=1;
                    render();
                    $('.addmod').modal('hide');
                }
            }
        });
    });
});