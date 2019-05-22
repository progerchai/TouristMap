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
    img.src="https://www.ffgbookbar.cn/map/images/map.png";
    img.onload=function(){
        imgX = -img.width/2;
        imgY = -img.height/2;
        drawImage();
    }
}



//图片缩放,传入双指中心点坐标,delta判断进行放大还是缩小操作
function scale(dre_x,dre_y,delta){
    var pos_temp=windowToCanvas(canvas,dre_x,dre_y);
    if(delta>0){
        imgScale*=2;
        imgX=imgX*2-pos_temp.x;
        imgY=imgY*2-pos_temp.y;
    }
    else if(delta<0){
        imgScale/=2;
        imgX=imgX*0.5+pos_temp.x*0.5;
        imgY=imgY*0.5+pos_temp.y*0.5;
    }
    drawImage();
}

function windowToCanvas(canvass,x,y){
    var bbox = canvas.getBoundingClientRect();
    return {
        x:x - bbox.left - (bbox.width - canvass.width) / 2,
        y:y - bbox.top - (bbox.height - canvass.height) / 2
        // x:bbox.left,
        // y:bbox.top
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

// 根据缩放比例重绘图片
// function drawImageByScale(scale){
//     var dx = canvas.width/2 -img.width*scale/2;
//     var dy = canvas.height/2 -img.height*scale/2;
//     context.clearRect(0,0,canvas.width,canvas.height);
//     context.drawImage(img,dx,dy,img.width*scale,img.height*scale);
// }
