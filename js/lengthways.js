//canvas像素级操作必须在服务器下运行才可以.
$(document).on('touchmove',function(ev){
    ev.preventDefault();
});
$(function(){
    var viewHeight = $(window).height();
    var page=$(".sec section");

    function slideList(){
        var margin_height = 0;
        var step = 1/4;
        var oldIndex = 0;   //上一页的层级
        var nextIndex = 0;  //下一页的层级
        var bBtn = true;

        page.on('touchstart',function(event){
            if(!bBtn){ return; }
            bBtn = false;
            var touch = event.originalEvent.changedTouches[0];
            margin_height = touch.pageY;
            oldIndex = $(this).index();

            page.on('touchmove',function(event){
                var touch = event.originalEvent.changedTouches[0];

                $(this).siblings().hide();

                if( touch.pageY < margin_height ){  //↑
                    nextIndex = oldIndex == page.length-1 ? 0 : oldIndex + 1;
                    page.eq(nextIndex).css('transform','translate(0,'+(viewHeight + touch.pageY - margin_height)+'px)');
                } else if( touch.pageY > margin_height ){  //↓
                    nextIndex = oldIndex == 0 ? page.length-1 : oldIndex - 1;
                    page.eq(nextIndex).css('transform','translate(0,'+(-viewHeight + touch.pageY - margin_height)+'px)');
                } else{
                    bBtn = true;
                }
                page.eq(nextIndex).show().addClass('zIndex');
                $(this).css('transform','translate(0,'+(touch.pageY - margin_height)*step+'px)  none('+(1-Math.abs(touch.pageY - margin_height)/viewHeight*step)+')');

                /*scale改成none 不执行2D翻页效果*/
            });

            page.on('touchend',function(event){
                var touch = event.originalEvent.changedTouches[0];
                if( touch.pageY < margin_height ){  //↑
                    $(this).css('transform','translate(0,'+(-viewHeight * step)+'px) none('+(1-step)+')');
                } else if( touch.pageY > margin_height ){  //↓
                    $(this).css('transform','translate(0,'+(viewHeight * step)+'px) none('+(1-step)+')');
                }
                /*scale改成none 不执行2D翻页效果*/

                $(this).css('transition','.3s');
                page.eq(nextIndex).css('transform','translate(0,0)');
                page.eq(nextIndex).css('transition','.3s');

            });

        });

        page.on('transitionEnd webkitTransitionEnd',function(event){
            resetFn();
        });

        function resetFn(){
            page.css('transition','');
            page.eq(nextIndex).removeClass('zIndex').siblings().hide();
            bBtn = true;
        }

    }
    slideList();
});