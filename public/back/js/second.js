/**
 * Created by yuner on 2017/10/31.
 */
$(function () {
    var currentPage=1;
    var pageSize=3;
    function render() {
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
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
    $('.add-btn').on('click',function () {
        $('.addmod').modal('show');
    });
    $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{
            page:1,
            pageSize:100
        },
        success:function (data) {
            $('.dropdown-menu').html(template('tpl2',data));
        }
    });
    // 点击下拉菜单，让其选中
    $('.dropdown-menu').on('click','a',function () {
        $('.dropdown-text').html($(this).html());
        $('.categoryId').val($(this).data('id'));
        $('form').data('bootstrapValidator').updateStatus('categoryId','VALID');
    });
    //初始文件上传
    $("#fileupload").fileupload({
        dataType:"json",
        //当文件上传成功时，会执行这个回调函数
        done:function (e, data) {
            // console.log(data.result);
            $('.up-img').attr('src',data.result.picAddr);
            $('.brandLogo').val(data.result.picAddr);
            $('form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
        }
    });


   // 表单验证
    $('form').bootstrapValidator({
        excluded:[],
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:'请选择一级分类'
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:'二级分类名称不能为空'
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:'上传图片不能为空'
                    }
                }
            }
        }



    });
        $('form').on('success.form.bv',function (e) {
        e.preventDefault();
            // console.log($('form').serialize());
                $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$('form').serialize(),
            success:function (data) {
                $('.addmod').modal('hide');
                currentPage=1;
                render();
                $('form')[0].reset();
                $('form').data('bootstrapValidator').resetForm();
            }
        })
    });
})