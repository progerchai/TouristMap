var DEF_PI = 3.14159265359; // PI
var DEF_2PI = 6.28318530712; // 2*PI
var DEF_PI180 = 0.01745329252; // PI/180.0
var DEF_R = 6370693.5; // radius of earth

function readTextFile(file) {
    var request = new XMLHttpRequest();
            request.open("get", file);/*设置请求方法与路径*/
            request.send(null);/*不发送数据到服务器*/
            request.onload = function () {/*XHR对象获取到返回信息后执行*/
                if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
                    var json = JSON.parse(request.responseText);
                    alert(json.length);
                    return json;
                }
            }
}   
//39.94607,116.32793  31.24063,121.42575
var dis = getShortDistance(39.94607,116.32793 ,31.24063,121.42575);
console.log(dis);
//经纬度计算距离
function getShortDistance(lon1, lat1, lon2, lat2) {
    //用haversine公式计算球面两点间的距离。
    //经纬度转换成弧度
    lat1 = ConvertDegreesToRadians(lat1);
    lon1 = ConvertDegreesToRadians(lon1);
    lat2 = ConvertDegreesToRadians(lat2);
    lon2 = ConvertDegreesToRadians(lon2);

    //差值
    var vLon = Math.abs(lon1 - lon2);
    var vLat = Math.abs(lat1 - lat2);

    //h is the great circle distance in radians, great circle就是一个球体上的切面，它的圆心即是球心的一个周长最大的圆。
    var h = HaverSin(vLat) + Math.cos(lat1) * Math.cos(lat2) * HaverSin(vLon);

    var distance = 2 * DEF_R * Math.asin(Math.sqrt(h));
//计算得到两点间距离
    return distance;
}

function ConvertDegreesToRadians(degrees){
    return degrees * Math.PI / 180;
}
function HaverSin(theta){
    var v = Math.sin(theta/2);
    return v*v;

}
