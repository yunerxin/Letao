/**
 * Created by yuner on 2017/11/1.
 */
    mui('.mui-scroll-wrapper').scroll({
        indicators:false
    });
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        success:function (data) {
            $('.lt_con_l ul').html(template('tpl',data));
            getId(data.rows[0].id);
        }
    });
    $('.lt_con_l').on('click','li',function () {
        $(this).addClass('now').siblings().removeClass('now');
        getId($(this).data('id'));
    });
    function getId(id) {
        $.ajax({
            type:'get',
            url:' /category/querySecondCategory',
            data:{
                id:id
            },
            success:function (data) {
                console.log(data);
                $('.lt_con_r ul').html(template('tpl2',data));
            }
        });
    }