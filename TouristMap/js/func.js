var oimg = document.getElementsByTagName("img");
var opop = document.getElementById("pop");
var closedone = document.getElementById("closedone");
var gotoNav = document.getElementById("gotoNav");
var goto = document.getElementById("goto");

var label = document.getElementById("label");
var intr = document.getElementById("intr");

// putIcons(20,10,50,50,"images/hotel.png");
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
//链接到百度地图
function gotoMap(){
    //获取目标地点的相关信息，不用获取本地相关信息
    var position = position_jw.split(",");
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

// 地图上显示个点图标
function showIcons( type ){
    var arraymes = [] ;
    for(var i = 0;i<information.length;i++)
    {
        if(information[i].what == type)
            arraymes.push(information[i]);
    } 
    // putIcons(arraymes);//将图片输出在前端
}
//同一类型的image进行展示
function putIcons(x,y,width,height,url){
    // var arraymes = array;
    var imglist = document.getElementById("imglist");
    var img = document.createElement("img");
    //设置img相关属性（图片路径，绝对定位，起始位置xy,图片宽高）
    img.src = url;
    img.style.position = "absolute";
    img.style.width = width +"px";
    img.style.height = height+"px";
    img.style.left = x +"px";
    img.style.top = y+"px";

    imglist.appendChild(img);
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



//图片切换接口预留
function imgchange(){
    var intr_img = document.getElementById('intr_img');
    intr_img.src=imglist+"";
}
function close_intr(){
    intr.style.display="none";
}
function showmes(e){
    intr.style.display="block";
    var x = e.clientX;
    var y = e.clientY;
    if(y < height/2)
    {
        intr.style.left=x - width/2.7  +'px';
        intr.style.top=y + height/20 +'px';
    }
    else
    { 
        intr.style.left=x - width/2.7 +'px';
        intr.style.top=y -height/4 +'px';
    }

    intr.style.height=height/5.5+'px';
    intr.style.width=width/1.5+'px';
}

closedone.onclick = function(){
    opop.style.display="none";
}


    var position_jw="";
    var goto_orgName="";
    var goto_orgAddress="";
    var imglist="";
    var data_jingdian=[];
    var bili=1;
    console.log("yuandian_JWD:");
    console.log(yuandian_JWD);


    function getMouseOnScreen(pageX, pageY) {

        var vector = new THREE.Vector2();
        vector.x=( pageX - this.screenLeft ) / this.screen.width;
        vector.y=( pageY - this.screenTop ) / this.screen.height;
        return vector;
    }


    // 鼠标双击触发的方法
    function onMouseDblclick(event) {

        // 获取 raycaster 和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
        var intersects = getIntersects(event);
        // 获取选中最近的 Mesh 对象
        if (intersects.length !== 0&& intersects[0].object instanceof THREE.Mesh ) {
            selectObject = intersects[0].object;
            //获取经纬度
            if(selectObject.position_jw!=null)
                position_jw=selectObject.position_jw;
            //获取音频
            if(selectObject.mp3!=null)
                mp3list=selectObject.mp3;

            //获取位置名
            if(selectObject.name!=null)
                goto_orgName=selectObject.name;
            //获取详细地址信息
            if(selectObject.address!=null)
                goto_orgAddress=selectObject.address;
            //获取图片地址
            if(selectObject.pic!=null)
                imglist=selectObject.pic;
                imgchange();
            if(selectObject.name!="地图")
                showmes(event);
            else
                close_intr();
            // console.log(intersects);
        } else {
            // alert("未选中 Mesh!");
            // console.log(intersects);
        }
    }

    // 获取与射线相交的对象数组,最小二乘法
    function getIntersects(event) {
        event.preventDefault();
        // 声明 raycaster 和 mouse 变量
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();

        // 通过鼠标点击位置,计算出 raycaster 所需点的位置,以屏幕为中心点,范围 -1 到 1
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        //通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
        raycaster.setFromCamera(mouse, camera);

        // 获取与射线相交的对象数组，其中的元素按照距离排序，越近的越靠前
        var intersects = raycaster.intersectObjects(scene.children,true);

        //返回选中的对象
        return intersects;
    }

    // 窗口变动触发的方法
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // 键盘按下触发的方法
    function onKeyDown(event) {
        switch (event.keyCode) {
            case 13:
                initCamera();
                initControls();
                break;
        }
    }

    // 初始化控件(包括按钮)
    function initControls() {
        controls = new THREE.TrackballControls(camera, renderer.domElement);
        controls.noRotate = true;//不旋转
        //controls.noZoom=true;//zoom放大缩小（摄像头距离远近）
        controls.noPan = true;//不移动
        controls.minDistance=70;
        controls.maxDistance=220;
        $("#jingdian").click(
                function() { 
                    var allchildren=scene.children;
                    for (var i = 0; i <allchildren.length; i++) {
                        if (allchildren[i].what=="1") {
                            allchildren[i].position.z=1;
                        }
                        else if (allchildren[i].what=="2") {
                            allchildren[i].position.z=-1;
                        }
                        else if (allchildren[i].what=="3") {
                            allchildren[i].position.z=-1;
                        }
                        else if (allchildren[i].what=="4") {
                            allchildren[i].position.z=-1;
                        }
                    }
                    
                }
            );
        $("#zhusu").click(
                function() { 
                    var allchildren=scene.children;
                    for (var i = 0; i <allchildren.length; i++) {
                        if (allchildren[i].what=="1") {
                            allchildren[i].position.z=-1;
                        }
                        else if (allchildren[i].what=="2") {
                            allchildren[i].position.z=1;
                        }
                        else if (allchildren[i].what=="3") {
                            allchildren[i].position.z=-1;
                        }
                        else if (allchildren[i].what=="4") {
                            allchildren[i].position.z=-1;
                        }
                    }

                    
                    
                }
            );
        $("#canyin").click(
                function() { 
                    var allchildren=scene.children;
                    for (var i = 0; i <allchildren.length; i++) {
                        if (allchildren[i].what=="1") {
                            allchildren[i].position.z=-1;
                        }
                        else if (allchildren[i].what=="2") {
                            allchildren[i].position.z=-1;
                        }
                        else if (allchildren[i].what=="3") {
                            allchildren[i].position.z=1;
                        }
                        else if (allchildren[i].what=="4") {
                            allchildren[i].position.z=-1;
                        }
                    }
                }
            );
        $("#cesuo").click(
                function() { 
                    var allchildren=scene.children;
                    for (var i = 0; i <allchildren.length; i++) {
                        if (allchildren[i].what=="1") {
                            allchildren[i].position.z=-1;
                        }
                        else if (allchildren[i].what=="2") {
                            allchildren[i].position.z=-1;
                        }
                        else if (allchildren[i].what=="3") {
                            allchildren[i].position.z=-1;
                        }
                        else if (allchildren[i].what=="4") {
                            allchildren[i].position.z=1;
                        }
                    }
                }
            );
    }

    function getLocation(){
        if(isJWD==0){
            jingdian_cube[pos_jingdian_cube_length].position.z=-1;
        }
        else if(isJWD==1){
            if(navigator.geolocation){
            //判断是否有这个对象
                navigator.geolocation.getCurrentPosition(function(pos){
                    // console.log("经度："+pos.coords.longitude+"纬度："+pos.coords.latitude)
                    now_JWD.x=pos.coords.longitude;
                    now_JWD.y=pos.coords.latitude;
                })
            }else{
                console.log("当前系统不支持GPS API")
            }
            now_distance.x=getShortDistance(now_JWD.x,now_JWD.y,yuandian_JWD.x,yuandian_JWD.y).x;
            now_distance.y=getShortDistance(now_JWD.x,now_JWD.y,yuandian_JWD.x,yuandian_JWD.y).y;
            jingdian_cube[pos_jingdian_cube_length].position.x=jingdian_cube[pos_jingdian_cube_length+1].position.x+now_distance.x*bili;
            jingdian_cube[pos_jingdian_cube_length].position.y=jingdian_cube[pos_jingdian_cube_length+1].position.y+now_distance.y*bili;
            jingdian_cube[pos_jingdian_cube_length].position.z=1;
        }
        else if(isJWD==-1){

        }
        

    }


    //经纬度计算距离
    var DEF_PI = 3.14159265359; // PI
    var DEF_2PI = 6.28318530712; // 2*PI
    var DEF_PI180 = 0.01745329252; // PI/180.0
    var DEF_R = 6370693.5; // radius of earth
    function getShortDistance(lon1, lat1, lon2, lat2) {
        var ew1, ns1, ew2, ns2;
        var dx, dy, dew;
        var distance=new THREE.Vector2(0,0);
        // 角度转换为弧度
        ew1 = lon1 * DEF_PI180;
        ns1 = lat1 * DEF_PI180;
        ew2 = lon2 * DEF_PI180;
        ns2 = lat2 * DEF_PI180;
        // 经度差
        dew = ew1 - ew2;
        dx = DEF_R * Math.cos(ns1) * dew; // 东西方向长度(在纬度圈上的投影长度)
        dy = DEF_R * (ns1 - ns2); // 南北方向长度(在经度圈上的投影长度)
        distance.x = dx.toFixed(0);
        distance.y = dy.toFixed(0);
        // console.log(distance);
        return distance;
    }
    

    // 初始化灯光
    function initLight() {
        light = new THREE.SpotLight(0xffffff);
        light.position.set(-300, 600, -400);
        light.castShadow = true;
        scene.add(light);
       
        // scene.add(new THREE.AmbientLight(0x5C5C5C));
        scene.add(new THREE.AmbientLight(0xffffff));   
    }

    function initGui() {
    }

    function initStats() {
    }

    // 更新div的位置
    function renderDiv(object) {
        // 获取窗口的一半高度和宽度
        let halfWidth = window.innerWidth / 2;
        let halfHeight = window.innerHeight / 2;
        // 逆转相机求出二维坐标
        let vector = object.position.clone().project(camera);
        $("#intr_title").text(object.name);
        $("#intr_content").text(object.cont);
    }

    function guiwei(){
        var temp_x=cube.position.x;
        var temp_y=cube.position.y;
        var max_x=132.33-0.286*camera.position.z;
        var max_y=94.86-0.415*camera.position.z;
        if(temp_x>max_x){
            objectMove(max_x-temp_x,0);
        }
        else if(temp_x<-max_x){
            objectMove(-max_x-temp_x,0);
        }
        if(temp_y>max_y){
            objectMove(0,-temp_y+max_y);
        }
        else if(temp_y<-max_y){
            objectMove(0,-max_y-temp_y);
        }

        for (var i = 0; i < jingdian_cube.length; i++){
            jingdian_cube[i].scale.x=1*camera.position.z*0.005;
            jingdian_cube[i].scale.y=1*camera.position.z*0.005;
        }
    }

    // 更新控件
    function update() {
        controls.update();
        controls.handleResize();
        guiwei();
        getLocation();
    }

    //移动地图
    function objectMove(x,y){
        cube.position.x+=x;
        cube.position.y+=y;
        for (var i = 0; i < jingdian_cube.length; i++){
            jingdian_cube[i].position.x+=x;
            jingdian_cube[i].position.y+=y;
        }
    }


    function touchstart( event ) {
        switch ( event.touches.length ) {
            case 1:
                // console.log("start");
                touchPoint=getMouseOnScreen( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) ;
                break;
            default: // 2 or more
                break;

        }

    }

    function touchmove( event ) {
        switch ( event.touches.length ) {
            case 1:
                var newPoint=getMouseOnScreen( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) ;
                var x=newPoint.x-touchPoint.x;
                var y=newPoint.y-touchPoint.y;
                objectMove(x*0.3*camera.position.z,-y*0.3*camera.position.z);
                touchPoint=newPoint;
                break;
            default: // 2 or more
                break;

        }
    }
