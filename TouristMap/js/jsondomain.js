//对json数据进行操作
var request;
var flag = 0;
var palace;
var startPoint;
function readTextFile(file) {
   request = new XMLHttpRequest();
     //2.设置回调函数    
    request.onreadystatechange = store;  
            request.open("get", file ,false);/*设置请求方法与路径*/
            request.send(null);/*不发送数据到服务器*/
            request.onload = function () {/*XHR对象获取到返回信息后执行*/
                if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
                    var json = JSON.parse(request.responseText);
                    return json;
                }
            }
}   
//回调函数，获取两个json文件的数据
function store(){
    if(flag==0)
       {
         palace = JSON.parse(request.responseText);
         flag = 1;
       }
       else{
         startPoint = JSON.parse(request.responseText);
       }
}

