let docu= document;

Element.prototype.phPrev=function(){
  return this.previousElementSibling;
}
Element.prototype.phNext = function(){
  return this.nextElementSibling;
}
Element.prototype.phAddClass=function(className){
  return this.classList.add(className);
}
Element.prototype.phRmClass=function(className){
  return this.classList.remove(className);
}
Element.prototype.phSetAttr=function(attr,content){
  return this.setAttribute(attr,content)
}
Element.prototype.phInHTML=function(content){
  return this.innerHTML=content
}

Document.prototype.phGetClassName=function(className){
  return this.getElementsByClassName(className)
}
Document.prototype.phGetId=function(className){
  return this.getElementById(className)
}
Document.prototype.phCreteEl=function(elementName){
  return this.createElement(elementName)
}


function _each(list,iter){
  for(var i=0;i<list.length;i++){
    iter(list[i]);
  }
  return;
}
function _for(str,num,iter){
  for(var str =0;str<num;str++){
    iter(str);
  }
  return;
}

function phAppendChild(){
  let c = Array.prototype.slice.call(arguments)
    for(var i =1;i<c.length;i++){
      c[0].appendChild(c[i])
    }
  return ;
}


