function getStyle(oDiv,name) {
    return oDiv.currentStyle?oDiv.currentStyle[name]:getComputedStyle(oDiv,false)[name];
}
function bian(obj,itarget,speed,W,fnEnd) {
    clearInterval(obj.timer);
    var InitSpeed = speed;
    var cur = 0;
    var length = W!="opacity"?Math.abs(parseInt(getStyle(obj,W))-itarget):Math.abs(parseInt(getStyle(obj,W)*100)-itarget);
    obj.timer = setInterval(function () {
        speed = W!="opacity"?Math.ceil((Math.abs(parseInt(getStyle(obj,W))-itarget))/length*InitSpeed):Math.ceil((Math.abs(parseInt(getStyle(obj,W)*100)-itarget))/length*InitSpeed);
        speed = parseInt( W!="opacity"?getStyle(obj,W):getStyle(obj,W)*100)>itarget?(-speed):speed;
        if(Math.abs(parseInt(parseInt(obj.style[W])-itarget))<14){
            if(W == "opacity"){
                obj.style.opacity = itarget/100;
                obj.style.filter = "alpha(opacity:"+itarget+")";
            }else if(W == "zIndex"){
                obj.style[W] = itarget;
            }else{
                obj.style[W] = itarget+"px";
            }

            if(parseInt(obj.style[W]) == itarget){
                clearInterval(obj.timer);
                if(fnEnd){
                    fnEnd();
                }
            }
        }else{
            cur = W!="opacity"?parseInt(getStyle(obj,W))+speed:parseInt(getStyle(obj,W)*100)+speed;
            if(W == "opacity"){
                obj.style.opacity = parseFloat(cur/100);
                obj.style.filter = "alpha(opacity:"+cur+")";
            }else if(W == "zIndex"){
                obj.style[W] = cur;
            }else{
                obj.style[W] = cur+"px";
            }
        }
    },30);
}