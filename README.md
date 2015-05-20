# jquery-slideshow
Simple jQuery carousel plugin

使用：  
1.添加占位符  
`<div id="slideShow"></div>`  
  
2.初始化插件 
<pre>
$("#slideShow").slideShow({
    /*可用配置
    delay: 5000,   //图片播放间隔时间
    duration: 250, //切换动画持续时间
    showDots: true,//是否显示图片导航点
    touch: true,   //(true:触摸，false:单击)导航点切换图片
    complete: function(){}, //动画完成后回调
    slides: [] //轮播图片组
    */
    slides: [
    	{image: '<img src="#">', href:"###"},
        {image: '<img src="#">', href:"###"},
        {image: '<img src="#">', href:"###"},
        {image: '<img src="#">', href:"###"}
    ]
});
</pre>