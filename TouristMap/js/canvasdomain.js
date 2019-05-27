    // 全局变量定义
var canvas,context;
var img,//图片对象
    imgX=0,//放置图片的x坐标
    imgY=0,//放置图片的y坐标
    pageX = 0,//双指中点x坐标
    pageY = 0,//双指中点y坐标
    imgScale=1;//缩放比例 
var pos,pos1;
var dis_move,dis_std,distance = false;//定义双指间距离,及判断是否获取到初始手指两点坐标
var width = window.screen.availWidth;
var height = window.screen.availHeight;

function loadImg(){
    img=new Image();
    // img.src="https://www.ffgbookbar.cn/TouristMap/images/map.jpg";
    img.src="https://www.sskstudio.cn/map.jpg";
    img.onload=function(){
        imgX = -img.width/2;
        imgY = -img.height/2;
        drawImage();
    }
}

//图片缩放,传入双指中心点坐标,delta判断进行放大还是缩小操作
function scale(dre_x,dre_y,delta){
    var pos_temp=windowToCanvas(canvas,dre_x,dre_y);
    if(delta>0)
        imgScale*=2;
    else if(delta<0)
        imgScale/=2;
// 缩放约束
    // if(imgX+pos_temp.x > 0||imgY+pos_temp.y>0||imgX+pos_temp.x<window.screen.availWidth-img.width*imgScale||imgY+pos_temp.y<window.screen.availHeight-img.height*imgScale)
    //             return 0;
    // alert(img.height*imgScale+"<?"+window.innerHeight);
    if(img.height*imgScale<window.innerHeight)
    {
                delta = 0;
        putIcons(what);
        return 0;
    }
    else{
        if(imgScale<0.125)
    {
        alert("不能继续缩小了哦！");
        return 0;
    }
    if(imgScale>8)
    {
        alert("不能继续放大了哦！");
        return 0;
    }
    if(delta>0){
        imgX=imgX*2-pos_temp.x;
        imgY=imgY*2-pos_temp.y;
    }
    else if(delta<0){
        imgX=imgX*0.5+pos_temp.x*0.5;
        imgY=imgY*0.5+pos_temp.y*0.5;
    }
            delta = 0;
    drawImage();
    putIcons(what);
    };

}
//得到图片距离canvas的左上角初始点的像素坐标
function windowToCanvas(canvas,x,y){
    var bbox = canvas.getBoundingClientRect();
    return {
        x:x - bbox.left,
        y:y - bbox.top
    };
}
// 重绘图片
function drawImage(){
    context.clearRect(0,0,canvas.width,canvas.height);
    // 0,0,img.width,img.height 表示整张图片全部绘制,imgX,imgY为图片开始展示的坐标点
    context.drawImage(img,0,0,img.width,img.height,imgX,imgY,img.width*imgScale,img.height*imgScale);
    console.log("3_imgX,imgY",imgX,imgY);
    // console.log("4_imgScale",imgScale);
}


//经纬度计算方位角。lon1(经度),lat1(纬度)为标准
function getazimuth(lon1, lat1, lon2, lat2){
    // var Aj=121.53721,Aw=29.829484,Bj=121.549777,Bw=29.832009;
    // var Aj=lon1,Aw=lat1,Bj=lon2,Bw=lat2;
    // var Aj=113.14,Aw=23.08,Bj=110.47,Bw=21.26;
// 方位角方法1
    // var cos=Math.cos(90-Bw)*Math.cos(90-Aw)+Math.sin(90-Bw)*Math.sin(90-Aw)*Math.cos(Bj-Aj)
    // var sin =Math.sqrt(1-Math.pow(cos,2));
    // var azimuth = Math.asin((Math.sin(90-Bw)*Math.sin(Bj-Aj))/sin)*180/Math.PI;
    // return azimuth;

// 方位角方法2
    // var tgAAA=(Math.cos(Bw)*Math.sin(Bj-Aj))/(Math.sin(Bw)*Math.cos(Aw)-Math.cos(Bw)*Math.sin(Aw)*Math.cos(Bj-Aj));
    // var azimuth = Math.atan(tgAAA)*180/Math.PI;
    // return azimuth;

// 计算不同维度的地球半径进行勾股计算
    var earthradio = DEF_C * Math.cos(lat1);
    var per_lon_dis = earthradio/360;
    var dis_x =(lon2 - lon1) * per_lon_dis;
    var distance = computeDis(lon1, lat1, lon2, lat2);
    var dis_y = Math.sqrt(Math.abs(Math.pow(distance,2)- Math.pow(dis_x,2)));//计算出来是绝对正值，要进行对比
    if(lat1<lat2)
        dis_y = -dis_y;
    return {
        dis_x:dis_x,
        dis_y:dis_y
    }
}
