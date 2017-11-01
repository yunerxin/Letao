/**
 * Created by yuner on 2017/11/1.
 */
$(function () {
    var currentPage = 1;
    var pageSize = 3;
    var imgArray = [];

    function render() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                $('tbody').html(template('tpl', data));
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
        })
    }

    render();
    $('.add-btn').on('click', function () {
        $('.addmod').modal('show');
    });
    $.ajax({
        type: 'get',
        url: '/category/querySecondCategoryPaging',
        data: {
            page: 1,
            pageSize: 100
        },
        success: function (data) {
            $('.dropdown-menu').html(template('tpl2', data));
        }
    });
    $('.dropdown').on('click', 'a', function () {
        $('.dropdown-text').html($(this).html());
        $('.brandId').val($(this).data('id'));
        $('form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
    });
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data);
            $('.up-ig').append('<img src="' + data.result.picAddr + '" width=100 height=100>');
            imgArray.push(data.result);
            if (imgArray.length == 3) {
                $('form').data('bootstrapValidator').updateStatus('img', 'VALID');
            }else {
                $('form').data('bootstrapValidator').updateStatus('img', 'INVALID');
            }
        }
    });
    $('form').bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '请输入一个大于0的库存'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入商品尺寸'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '请输入正确尺码(30-45)'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入商品原价'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品折扣价'
                    }
                }
            },
            img: {
                validators: {
                    notEmpty: {
                        message: '请上传3张图片'
                    }
                }
            },
        }
    });


    $('form').on('success.form.bv',function (e) {
        e.preventDefault();
        var result=$('form').serialize();
        for(var i=0;i<imgArray.length;i++){
            result+='&picName1='+imgArray[i].picName+"&picAddr1="+imgArray[i].picAddr;
        }
        // result+='&picName1='+imgArray[0].picName+"&picAddr1="+imgArray[0].picAddr;
        // result+='&picName1='+imgArray[1].picName+"&picAddr1="+imgArray[1].picAddr;
        // result+='&picName1='+imgArray[2].picName+"&picAddr1="+imgArray[2].picAddr;
            $.ajax({
                type:'post',
                url:'/product/addProduct',
                data:result,
                success:function (data) {
                    $('.addmod').modal('hide');
                    $('form')[0].reset();
                    $('form').data('bootstrapValidator').resetForm();
                    $('.dropdown-text').html('请选择二级分类');
                    $('.up-ig').html(null);
                    currentPage=1;
                    render();
                }
            });
        });
})