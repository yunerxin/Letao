/**
 * Created by yuner on 2017/11/2.
 */
mui('.mui-scroll-wrapper').scroll({
    indicators:false
});
function getArr() {
    // localStorage.setItem('lt_search_history','["张三","李思","丽思","里斯"]')
    var ltHistory=localStorage.getItem('lt_search_history')||'[]';
    var arr=JSON.parse(ltHistory);
    // console.log(arr);
    return arr;
}
function render() {
    var arr=getArr();
    $('.lt_history').html(template('tpl',{arr:arr}));
}
render();
//点击清空按钮，清空localStorage,再重新渲染
$('.lt_history').on('click','.lt_empty',function () {
    // console.log(122);
    localStorage.removeItem('lt_search_history');
    render();
});
//点击删除按钮，删除当前一条数据(拿到当前的index值，删除数组的第index项，重新设置localStorage的值，再渲染)
$('.lt_history').on('click','.del_i',function () {
    var index=$(this).data('index');
    var arr=getArr();
    arr.splice(index, 1);
    localStorage.setItem('lt_search_history',JSON.stringify(arr));
    render();
    mui.toast('删除成功');
});
//添加搜索历史记录(点击搜索按钮拿到input框的值，将其放入arr中，
// 先判断是否有重复输入的值，若有，则把其删除之后再放入最前边，之后规定最多有10条
// 内容，如果多于10条内容，则删除最后的一条.最后重新设置localStorge的值，再重新渲染)
$('.search_btn').on('click',function () {
    var value=$(this).prev().val().trim();
    if(value==""){
        mui.alert('亲，你想买啥');
        return;
    }
    location.href='searchList.html?key='+value+'';
    var arr=getArr();
    var index=arr.indexOf(value);
    if(arr.indexOf(value)>-1){
       arr.splice(index,1);
    };
    arr.unshift(value);
    if(arr.length>=10){
        arr.pop();
    };
    localStorage.setItem('lt_search_history',JSON.stringify(arr));
    render();
});