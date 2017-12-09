function getStyle(obj, name) {
    if(obj.currentStyle){
        return obj.currentStyle[name];
    }else{
        return getComputedStyle(obj, false)[name];
    }
}
function startMove(obj, json, fnEnd) {
    clearInterval(obj.timer);
    obj.timer=setInterval(function (){
        var bStop=true;		//假设：所有值都已经到了
        for(var attr in json) {
            var cur=0;
            if(attr=='opacity'){
                cur=Math.round(parseFloat(getStyle(obj, attr))*100);
            }else {
                cur=parseInt(getStyle(obj, attr));
            }
            var speed=(json[attr]-cur)/12;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            if(cur!=json[attr]){
                bStop=false;
            }
            if(attr=='opacity') {
                obj.style.filter='alpha(opacity:'+(cur+speed)+')';
                obj.style.opacity=(cur+speed)/100;
            }else if(attr == "display"){
                obj.style[attr]=cur+speed;
            }else {
                obj.style[attr]=cur+speed+'px';
            }
        }
        if(bStop) {
            clearInterval(obj.timer);
            if(fnEnd){
                fnEnd();
            }
        }
    }, 10);
}
function startMove1(spe,interval,obj, json, fnEnd)
{
    clearInterval(obj.timer);
    obj.timer=setInterval(function (){
        var bStop=true;		//假设：所有值都已经到了

        for(var attr in json)
        {
            var cur=0;
            if(attr=='opacity')
            {
                cur=Math.round(parseFloat(getStyle(obj, attr))*100);
            }
            else
            {
                cur=parseInt(getStyle(obj, attr));
            }
            var speed=(json[attr]-cur)/spe;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);

            if(cur!=json[attr]){
                bStop=false;
            }

            if(attr=='opacity')
            {
                obj.style.filter='alpha(opacity:'+(cur+speed)+')';
                obj.style.opacity=(cur+speed)/100;
            }
            else
            {
                obj.style[attr]=cur+speed+'px';
            }
        }

        if(bStop)
        {
            clearInterval(obj.timer);

            if(fnEnd){
                fnEnd();
            }
        }
    }, interval);
}
function  changebg(k) {
                ba.style.zIndex=200;
                ba.style.background = "#2f2f2f";
                startMove(ba,{opacity:100},function () {
                    body.style.background="url(images/"+k+".jpg)";
                    startMove(ba,{opacity:0},function () {
                        ba.style.zIndex=50;
                        ba.style.background="rgba(0,0,0,.6)";
                    });
                });
            }

function getClassNames(classStr,tagName){  
      if (document.getElementsByClassName) {  
            return document.getElementsByClassName(classStr)  
      }else {  
            var nodes = document.getElementsByTagName(tagName),ret = [];           
            for(i = 0; i < nodes.length; i++) {  
         if(hasClass(nodes[i],classStr)){  
                ret.push(nodes[i])  
         }  
      }  
      return ret;  
       }  
}  
function hasClass(tagStr,classStr){  
     var arr=tagStr.className.split(/\s+/ );  //这个正则表达式是因为class可以有多个,判断是否包含  
     for (var i=0;i<arr.length;i++){  
            if (arr[i]==classStr){  
                  return true ;  
            }  
     }  
     return false ;  
}
function MyAddEvent(obj,ev,fn) {
    if(obj.attachEvent){
        obj.attachEvent('on'+ev,fn);
    }
    else {
        obj.addEventListener('ev',fn,false);
    }
}