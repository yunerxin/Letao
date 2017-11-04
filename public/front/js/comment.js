/**
 * Created by yuner on 2017/11/3.
 */
var result={
   getobj:function () {
       var a={};
       var hf=location.search;
       var b=hf.slice(1);
       var c=b.split('&');
       for(var i=0;i<c.length;i++){
           var key=c[i].split('=')[0];
           var value=decodeURI(c[i].split('=')[1]);
           a[key]=value;
       }
       return a;
   },
    getresult:function (key) {
        return this.getobj()[key];
    },
    checklogin:function (data) {
      if(data.error==400){
          location.href='login.html?jumpUrl='+location.href;
      }
    }
}