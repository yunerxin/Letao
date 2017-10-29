/**
 * Created by yuner on 2017/10/29.
 */
$(function () {
    $('form').bootstrapValidator({
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:'用户名不能为空'
                    },
                    callback:{
                        message:'用户名不存在'
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:'密码不能为空'
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:'用户名长度必须在6到12之间'
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            }
        }
    })
    var validator = $("form").data('bootstrapValidator');
//    注册表单验证成功事件
    $('form').on('success.form.bv',function (e) {
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$('form').serialize(),
            success:function (data) {
                if(data.success){
                    location.href='index.html';
                }
                if(data.error===1000){
                   // alert('用户名不存在');
                    validator.updateStatus('username', 'INVALID','callback' );
               }
                if(data.error===1001){
                    // alert('密码错误');
                    validator.updateStatus('password', 'INVALID','callback' );
                }
            }
        })
    })
//    重置表单
    $('[type="reset"]').on('click',function () {
        validator.resetForm();
    })
})
