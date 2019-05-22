window.onload = function(){
			var mycanvas = document.getElementById('mycanvas');
			var ctx = mycanvas.getContext('2d');
			var body = document.getElementByTagname("body");
			body.style.width = "100px";
			body.style.height = "100px";
			// 内存中先加载，然后当内存加载完毕时，再把内存中的数据填充到我们的 dom元素中，这样能够快速的去
			// 反应，比如网易的图片
			var img = new Image();
			img.src = "https://www.ffgbookbar.cn/map/images/map.png";
			// img.src = "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1537549551&di=3f8d4d76679adcae225387f7d6b199aa&src=http://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/lvpics/h=800/sign=b49dc48f8718367ab28972dd1e728b68/9922720e0cf3d7ca7f0736d0f31fbe096a63a9a6.jpg"
			img.onload = function(){
				// alert("图片的尺寸为："+img.width+img.height);
				var width = img.width;
				var height = img.height;
				mycanvas.width = width/10;
				mycanvas.height = height/10;
				// 将图片画到canvas上面上去！
				ctx.drawImage(img,0,0);

			}

		}
$(document).ready(

    function(){
    
        $("#zoomButton").click(
        
        
            function(){
            
               
               var canvas = document.getElementById("viewport");
            canvas.width = canvas.width * 1.5;
            canvas.height = canvas.height * 1.5;
            
            
            }
        
        
        );
    
    
    }



);

function scrollCanvas(e){
    console.log(e);
    var canvasLen = e.detail.scrollLeft;
    this.setData({
        canvasLen: canvasLen
    })
}
