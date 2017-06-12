/**
 * Created by gyy on 2017-04-28.
 */
function pageControl(){
    var Hdocument=$(window).height();
    $('.main-content').height(Hdocument-80);
}
//照片上传功能
function previewImage(file)
{
    var MAXWIDTH= 260;
    var MAXHEIGHT= 180;
    var div = document.getElementById('preview');
    if (file.files && file.files[0])
    {
        div.innerHTML ='<img id=imghead>';
        var img = document.getElementById('imghead');
        img.onload = function(){
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            img.width=rect.width;
            img.height=rect.height;
//???????????????? img.style.marginLeft = rect.left+'px';
            img.style.marginTop = rect.top+'px';
        }
        var reader = new FileReader();
        reader.onload = function(evt){img.src = evt.target.result;}
        reader.readAsDataURL(file.files[0]);
    }
    else //兼容IE
    {
        var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        div.innerHTML = '<img id=imghead>';
        var img = document.getElementById('imghead');
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
        div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
    }
}
function clacImgZoomParam( maxWidth, maxHeight, width, height ){
    var param = {top:0, left:0, width:width, height:height};
    if( width>maxWidth || height>maxHeight )
    {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;

        if( rateWidth > rateHeight )
        {
            param.width=maxWidth;
            param.height=Math.round(height / rateWidth);
        }else
        {
            param.width=Math.round(width / rateHeight);
            param.height=maxHeight;
        }
    }

    param.left=Math.round((maxWidth - param.width) / 2);
    param.top=Math.round((maxHeight - param.height) / 2);
    return param;
}
//照片上传结束
    //验证码60s倒计时
    var wait=60;
    function time(o) {
        if (wait == 0) {
            o.html("免费获取验证码");
            wait = 60;
        } else {
            o.html(wait+"秒后可以重新获取");
            wait--;
            setTimeout(function() {
                time(o)
            }, 1000)
        }
    }
//两次不一致
$(function(){
    pageControl();
    var flag=1;
    $('.cxGet').click(function(){
        if(flag){
        time($(this));
            flag=0;
        }
    });
    $('.second-pwd').blur(function(){
        var f1 = $('.first-pwd').val();
        var f2 = $('.second-pwd').val();
        //console.log(f1);
        if (f1==f2) {
            $('.diff').hide();
        } else {
            $('.diff').show();
        }
    });
    $('.first-pwd').blur(function(){
        var reg=/((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{8,16}$/;
        var f2 = $(this).val();
        console.log(f2);
        if(!reg.test(f2)){
            $('.zq').hide();
        }else{
            $('.zq').css('display','inline-block');
        }
    });
    $('.phonenum').blur(function(){
        var reg = /^1[3|4|5|7|8][0-9]{9}$/;
        var f3=$(this).val();
        if(!reg.test(f3)){
            $(this).addClass('active');
        }else{
            $(this).removeClass('active');
        }
        if(f3==''){
            $(this).removeClass('active')
        }
    });
    //中英文二维码盒子切换
    var boxs=$('.login-box');
    var Index=$(boxs).index();
    //console.log(Index);
    $('.chinaBox,.computerBox').click(function(){
        boxs.eq(0).show();
        boxs.eq(1).hide();
        boxs.eq(2).hide();
    });
    $('.englishBox').click(function(){
        boxs.eq(1).show();
        boxs.eq(0).hide();
        boxs.eq(2).hide();
    });
    $('.ewmBox').click(function(){
        boxs.eq(2).show();
        boxs.eq(1).hide();
        boxs.eq(0).hide();
    });
});