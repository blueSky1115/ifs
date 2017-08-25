$(function(){
    var pageH = 504;
    var pageW = 320;
    var winH = $(window).height()||504;
    var winW = $(window).width()||320;
    var scale = 1;
    var parm = 0;
    if((winH/winW)>(pageH/pageW)){
        scale=winW/pageW;
        parm="scale("+scale+")";
        $(".treeBox,.treeBoxP2,.treeBoxP3,.treeBoxP4,.windmillBox").css("webkitTransform",parm);
    }else if((winH/winW)<(pageH/pageW)){
        scale=winH/pageH;
        parm="scale("+scale+")";
        $(".treeBox,.treeBoxP2,.treeBoxP3,.treeBoxP4,.windmillBox").css("webkitTransform", parm);
    }else{
        scale = winH / pageH;
        parm = "scale(" + scale + ")";
        $(".treeBox,.treeBoxP2,.treeBoxP3,.treeBoxP4,.windmillBox").css("webkitTransform", parm);
    }
});