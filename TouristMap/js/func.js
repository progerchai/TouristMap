var opop = document.getElementById("pop");
var closedone = document.getElementById("closedone");
var intr = document.getElementById("intr");
var timer = 0;//用来icon图片绑定事件 计数
var timerList = [];
// 禁止除微信端访问
function judgeview(){
        // 对浏览器的UserAgent进行正则匹配，不含有微信独有标识的则为其他浏览器
    var useragent = navigator.userAgent;
    var isAndroid = useragent.indexOf('Android') > -1 || useragent.indexOf('Adr') > -1; //android终端
    var isiOS = !!useragent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    console.log("是否是安卓端访问："+isAndroid);
    console.log("是否是IOS端访问："+isiOS);

    if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
        // 这里警告框会阻塞当前页面继续加载
        alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
        // 以下代码是用javascript强行关闭当前页面
        var opened = window.open('about:blank', '_self');
        opened.opener = null;
        opened.close();
    }
}
//链接到百度地图，现阶段默认地址,无参数传递
function gotoMap(){
    //获取目标地点的相关信息，不用获取本地相关信息
    // var position = position_jw.split(",");
    var goto_lon=120.69477;//目标地点经度
    var goto_lat=27.92325;//目标地点纬度
    var goto_orgName = "温州大学";
    var goto_orgAddress = "温州大学，经度:120.69477纬度:27.92325";
    console.log("经纬度为:"+goto_lat+","+goto_lon);

    var mapUrl_tx = "http://apis.map.qq.com/uri/v1/marker?marker=coord:"+goto_lat+","+goto_lon+";title:"+goto_orgName+";addr:"+goto_orgAddress+"&referer=yellowpage";
    	// 腾讯地图
	window.open(mapUrl_tx);

}
//mp3播放函数
function autoPlay(){
    var myAuto = document.getElementById('myaudio');
    // console.log("list:"+mp3list); 
         myAuto.load=function(){
            myAuto.src= mp3list;
         }
    myAuto.play();
}
//mp3停止函数
function autoPause(){
    var myAuto = document.getElementById('myaudio');
    myAuto.pause();
}

//同一类型的image进行展示
function putOneIcon(x,y,img_width,img_height,url){
    // 若超出可显示界面，则不对图片能进行绘制
    // if(x>width||x<0||y<0||y>height)
    //     return 0;
    var img = document.createElement("img");
    var imglist = document.getElementById("imglist");//获取对象，很关键
    //设置img相关属性（图片路径，绝对定位，起始位置xy,图片宽高）
    img.src = url;
    img.style.position = "absolute";
    img.style.width = img_width +"px";
    img.style.height = img_height+"px";
    img.style.left = x +"px";
    img.style.top = y+"px";
    img.name = "iconImage";
    img.value = timer;
    //为图片增加事件
    img.addEventListener("click",function(e){
        showIntroduce(this.value,what,x,y);
    });
    imglist.appendChild(img);
    timer++;
    // alert(palace.length);
}
function putIcons(what){
    timer = 0;
     document.getElementById("imglist").innerHTML="";//清空上一步存放的所有img对象
     var startPoint_JD = parseFloat(startPoint[0].position.split(",")[0]);
     var startPoint_wD = parseFloat(startPoint[0].position.split(",")[1]);
     var iconUrl ="images/hotel.png";
    switch(what)
        {
            case 1:
             iconUrl = "images/palace.png";
             break;
            case 2:
             iconUrl = "images/hotel.png";
             break;
            case 3:
             iconUrl = "images/restaurant.png";
             break;
            case 4:
             iconUrl = "images/cesuo.png";
             break;
        }
    //调用数次putOneIcon函数，对所有图片icon进行前端展示
    for(var i = 0;i<palace.length;i++){
        if(palace[i].what == what)
        {
            var position_x = parseFloat(palace[i].position.split(",")[0]);
            var position_y = parseFloat(palace[i].position.split(",")[1]);
            var dis = getazimuth(120.697878,27.915796,position_x,position_y);

            putOneIcon(imgX+(img.width/2+dis.dis_x/20)*imgScale,imgY+(img.height/2+dis.dis_y/20)*imgScale,50,50,iconUrl);
        }
    }
}
//展示列表box
function showLieBiao(){
     var opop = document.getElementById("pop");
        opop.style.height=height/2+'px';
        opop.style.width=width/2+'px';
     if (opop.style.display=="none")
            opop.style.display="block";
        else
            opop.style.display="none";
}

//按钮类型进行缩放
function fangda(){
     scale(width/2,height/2,100);
}
function suoxiao(){
     scale(width/2,height/2,-100);
}
function restore(){
    imgScale = 1;
    imgX = -img.width/2;
    imgY = -img.height/2;
   drawImage();
}
// flow为表示第几张图片,intr_x,intr_y为手指点击点的坐标
function showIntroduce(flow,what,intr_x,intr_y){
    // alert(flow);
    var flag = 0;
    for (var i = 0; i < palace.length ; i++) {
        if(palace[i].what == what)
        {
            if(flag == flow)
                {
                    // 将palace对应的数据存放起来
                    document.getElementById("intr_title").innerHTML=palace[i].name;
                    document.getElementById("intr_content").innerHTML=palace[i].cont;
                    var image= document.getElementById("intr_img");
                    image.src=palace[i].pic;
                    image.style.width = 80 +"px";
                    image.style.height = 80 +"px";
                    showmes(intr_x,intr_y);
                    return 0;
                }
            else flag++;
        }
    }
}
// 图片切换接口预留
// function imgchange(){
//     var intr_img = document.getElementById('intr_img');
//     intr_img.src=imglist+"";
// }
function close_intr(){
    intr.style.display="none";
    autoPause();
}
function showmes(intr_x,intr_y){
    intr.style.top = 140+"px";
    intr.style.left = 100+"px";
    var intr_content = document.getElementById("intr_content");
    intr_content.style.fontSize = 12 +"pt";
    intr.style.display="block";
    // alert(intr_x+" * "+intr_y);
    // var x = e.clientX;
    // var y = e.clientY;
    // if(y < height/2)
    // {
    //     intr.style.left=x - width/2.7  +'px';
    //     intr.style.top=y + height/20 +'px';
    // }
    // else
    // { 
    //     intr.style.left=x - width/2.7 +'px';
    //     intr.style.top=y -height/4 +'px';
    // }

    // intr.style.height=height/5.5+'px';
    // intr.style.width=width/1.5+'px';
}

closedone.onclick = function(){
    opop.style.display="none";
}