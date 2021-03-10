$(document).ready(function() {
  setTabs();
  setTabStatistics()

	/* Selectric (http://selectric.js.org/)
	======================= */

	// хедер
	$(".t-user-other-block-item.menu").click(function(){
		$(".t-header-other-menu-block").addClass("open");
	})

	$(".t-modal__close").click(function(){
		$(".t-header-other-menu-block").removeClass("open");
	})

	$(".t-header-other-menu-block__accordion-item").click(function(){
		$(this).toggleClass("active");
	})

	// $(".t-header-other-menu-block__accordion-item").click(function(){
	// 	$(".t-header-other-menu-block__accordion-content").addClass("sublist");
	// })

	$(".t-header-other-icon-text").each(function(i, el){
		el.innerText = Number(el.innerText).toLocaleString('ru-RU');
	})

});

/* Select */

$('input[type=text]').on('focusin', function () {
	$(this).addClass('active');
	window.scrollTo(y);
})
$('input[type=text]').on('focusout', function () {
	if (this.value === '') {
		$(this).removeClass('active');
	}
})

/* Tabs
============== */

function setTabs() {
	$(".t-tabs").on("click", ".t-tabs__item", function(){
		var tabs = $(".t-tabs .t-tabs__item"),
			  cont = $(".t-tabs__content");
		tabs.removeClass("t-tabs__item--active");
		cont.removeClass("t-tabs__content--active");
		$(this).addClass("t-tabs__item--active");
		cont.eq($(this).index()).addClass("t-tabs__content--active");
		return false;
	});
}

function setTabStatistics() {
	$(".t-statistics__tabs").on("click", ".t-statistics__tabs-item", function(){
		var tabs = $(".t-statistics__tabs .t-statistics__tabs-item"),
			  cont = $(".t-statistics__tabs-content");
		tabs.removeClass("t-statistics__tabs-item--active");
		cont.removeClass("t-statistics__tabs-content--active");
		$(this).addClass("t-statistics__tabs-item--active");
		cont.eq($(this).index()).addClass("t-statistics__tabs-content--active");
		return false;
	});

	$(".t-tabs.statistics").on("click", ".t-tabs__item", function(){
		var tabs = $(".t-tabs.statistics .t-tabs__item"),
			cont = $(".t-tabs__content");
		tabs.removeClass("t-tabs__item--active");
		tabs.find(".t-radio__input").removeAttr("checked", "checked");
		cont.removeClass("t-tabs__content--active");
		$(this).addClass("t-tabs__item--active");
		$(this).find(".t-radio__input").attr("checked", "checked");
		cont.eq($(this).index()).addClass("t-tabs__content--active");
		return false;
	});

	$(".t-view").on("click", ".t-view__item", function(){
		var tabs = $(".t-view .t-view__item"),
		cont = $(".t-view__content");
		tabs.removeClass('active');
		cont.removeClass('t-view__content--active');
		$(this).addClass('active');
		cont.eq($(this).index()).addClass('t-view__content--active');
		return false;
	});

}

/* Sticky-kit v1.1.2 */
(function() {
	var $, win;
  
	$ = this.jQuery || window.jQuery;
  
	win = $(window);
  
	$.fn.stick_in_parent = function(opts) {
	  var doc, elm, enable_bottoming, fn, i, inner_scrolling, len, manual_spacer, offset_top, parent_selector, recalc_every, sticky_class;
	  if (opts == null) {
		opts = {};
	  }
	  sticky_class = opts.sticky_class, inner_scrolling = opts.inner_scrolling, recalc_every = opts.recalc_every, parent_selector = opts.parent, offset_top = opts.offset_top, manual_spacer = opts.spacer, enable_bottoming = opts.bottoming;
	  if (offset_top == null) {
		offset_top = 0;
	  }
	  if (parent_selector == null) {
		parent_selector = void 0;
	  }
	  if (inner_scrolling == null) {
		inner_scrolling = true;
	  }
	  if (sticky_class == null) {
		sticky_class = "is_stuck";
	  }
	  doc = $(document);
	  if (enable_bottoming == null) {
		enable_bottoming = true;
	  }
	  fn = function(elm, padding_bottom, parent_top, parent_height, top, height, el_float, detached) {
		var bottomed, detach, fixed, last_pos, last_scroll_height, offset, parent, recalc, recalc_and_tick, recalc_counter, spacer, tick;
		if (elm.data("sticky_kit")) {
		  return;
		}
		elm.data("sticky_kit", true);
		last_scroll_height = doc.height();
		parent = elm.parent();
		if (parent_selector != null) {
		  parent = parent.closest(parent_selector);
		}
		if (!parent.length) {
		  throw "failed to find stick parent";
		}
		fixed = false;
		bottomed = false;
		spacer = manual_spacer != null ? manual_spacer && elm.closest(manual_spacer) : $("<div />");
		if (spacer) {
		  spacer.css('position', elm.css('position'));
		}
		recalc = function() {
		  var border_top, padding_top, restore;
		  if (detached) {
			return;
		  }
		  last_scroll_height = doc.height();
		  border_top = parseInt(parent.css("border-top-width"), 10);
		  padding_top = parseInt(parent.css("padding-top"), 10);
		  padding_bottom = parseInt(parent.css("padding-bottom"), 10);
		  parent_top = parent.offset().top + border_top + padding_top;
		  parent_height = parent.height();
		  if (fixed) {
			fixed = false;
			bottomed = false;
			if (manual_spacer == null) {
			  elm.insertAfter(spacer);
			  spacer.detach();
			}
			elm.css({
			  position: "",
			  top: "",
			  width: "",
			  bottom: ""
			}).removeClass(sticky_class);
			restore = true;
		  }
		  top = elm.offset().top - (parseInt(elm.css("margin-top"), 10) || 0) - offset_top;
		  height = elm.outerHeight(true);
		  el_float = elm.css("float");
		  if (spacer) {
			spacer.css({
			  width: elm.outerWidth(true),
			  height: height,
			  display: elm.css("display"),
			  "vertical-align": elm.css("vertical-align"),
			  "float": el_float
			});
		  }
		  if (restore) {
			return tick();
		  }
		};
		recalc();
		if (height === parent_height) {
		  return;
		}
		last_pos = void 0;
		offset = offset_top;
		recalc_counter = recalc_every;
		tick = function() {
		  var css, delta, recalced, scroll, will_bottom, win_height;
		  if (detached) {
			return;
		  }
		  recalced = false;
		  if (recalc_counter != null) {
			recalc_counter -= 1;
			if (recalc_counter <= 0) {
			  recalc_counter = recalc_every;
			  recalc();
			  recalced = true;
			}
		  }
		  if (!recalced && doc.height() !== last_scroll_height) {
			recalc();
			recalced = true;
		  }
		  scroll = win.scrollTop();
		  if (last_pos != null) {
			delta = scroll - last_pos;
		  }
		  last_pos = scroll;
		  if (fixed) {
			if (enable_bottoming) {
			  will_bottom = scroll + height + offset > parent_height + parent_top;
			  if (bottomed && !will_bottom) {
				bottomed = false;
				elm.css({
				  position: "fixed",
				  bottom: "",
				  top: offset
				}).trigger("sticky_kit:unbottom");
			  }
			}
			if (scroll < top) {
			  fixed = false;
			  offset = offset_top;
			  if (manual_spacer == null) {
				if (el_float === "left" || el_float === "right") {
				  elm.insertAfter(spacer);
				}
				spacer.detach();
			  }
			  css = {
				position: "",
				width: "",
				top: ""
			  };
			  elm.css(css).removeClass(sticky_class).trigger("sticky_kit:unstick");
			}
			if (inner_scrolling) {
			  win_height = win.height();
			  if (height + offset_top > win_height) {
				if (!bottomed) {
				  offset -= delta;
				  offset = Math.max(win_height - height, offset);
				  offset = Math.min(offset_top, offset);
				  if (fixed) {
					elm.css({
					  top: offset + "px"
					});
				  }
				}
			  }
			}
		  } else {
			if (scroll > top) {
			  fixed = true;
			  css = {
				position: "fixed",
				top: offset
			  };
			  css.width = elm.css("box-sizing") === "border-box" ? elm.outerWidth() + "px" : elm.width() + "px";
			  elm.css(css).addClass(sticky_class);
			  if (manual_spacer == null) {
				elm.after(spacer);
				if (el_float === "left" || el_float === "right") {
				  spacer.append(elm);
				}
			  }
			  elm.trigger("sticky_kit:stick");
			}
		  }
		  if (fixed && enable_bottoming) {
			if (will_bottom == null) {
			  will_bottom = scroll + height + offset > parent_height + parent_top;
			}
			if (!bottomed && will_bottom) {
			  bottomed = true;
			  if (parent.css("position") === "static") {
				parent.css({
				  position: "relative"
				});
			  }
			  return elm.css({
				position: "absolute",
				bottom: padding_bottom,
				top: "auto"
			  }).trigger("sticky_kit:bottom");
			}
		  }
		};
		recalc_and_tick = function() {
		  recalc();
		  return tick();
		};
		detach = function() {
		  detached = true;
		  win.off("touchmove", tick);
		  win.off("scroll", tick);
		  win.off("resize", recalc_and_tick);
		  $(document.body).off("sticky_kit:recalc", recalc_and_tick);
		  elm.off("sticky_kit:detach", detach);
		  elm.removeData("sticky_kit");
		  elm.css({
			position: "",
			bottom: "",
			top: "",
			width: ""
		  });
		  parent.position("position", "");
		  if (fixed) {
			if (manual_spacer == null) {
			  if (el_float === "left" || el_float === "right") {
				elm.insertAfter(spacer);
			  }
			  spacer.remove();
			}
			return elm.removeClass(sticky_class);
		  }
		};
		win.on("touchmove", tick);
		win.on("scroll", tick);
		win.on("resize", recalc_and_tick);
		$(document.body).on("sticky_kit:recalc", recalc_and_tick);
		elm.on("sticky_kit:detach", detach);
		return setTimeout(tick, 0);
	  };
	  for (i = 0, len = this.length; i < len; i++) {
		elm = this[i];
		fn($(elm));
	  }
	  return this;
	};
  
  }).call(this);




/*var theBody = $(document.body);
var block = $(".stick_in_parent-js");
var blockPosition = $(".stick_in_parent-js").offset().top;

block.stick_in_parent(".s-homework__content-wrap-js");

theBody.scroll(() => {
	var position = theBody.scrollTop();
	var isStuck = block.hasClass("is_stuck");

	if (!isStuck && position <= blockPosition) {
		return;
	}

	if (isStuck && position > blockPosition) {
		return;
	}

	block.trigger("sticky_kit:recalc");
});*/


/* ==========================================================
 * MobilySlider
 * date: 20.1.2010
 * author: Marcin Dziewulski
 * last update: 02.02.2011
 * web: http://www.mobily.pl or http://playground.mobily.pl
 * email: hello@mobily.pl
 * Free to use under the MIT license.
 * ========================================================== */
(function($){$.fn.mobilyslider=function(options){var defaults={content:".sliderContent",children:"div",transition:"horizontal",animationSpeed:300,autoplay:false,autoplaySpeed:3000,pauseOnHover:false,bullets:true,arrows:true,arrowsHide:true,prev:"prev",next:"next",animationStart:function(){},animationComplete:function(){}};var sets=$.extend({},defaults,options);return this.each(function(){var $t=$(this),item=$t.children(sets.content).children(sets.children),l=item.length-1,w=item.width(),h=item.height(),step=0,play,bullets,arrows,z,active,bullet;var slider={init:function(){slider.data();if(sets.bullets){slider.bullets.create()}if(sets.arrows){slider.arrows.create()}if(sets.autoplay){slider.autoplay()}slider.triggers()},data:function(){item.each(function(i){$(this).css("z-index",-(i-l))});if(sets.transition=="fade"){item.hide().eq(0).show()}},zindex:{prev:function(){step==l?item.eq(0).css("z-index",l+3):item.css("z-index",l+1);item.eq(step).css("z-index",l+4).next(item).css("z-index",l+2)},next:function(){item.css("z-index",l+1).eq(step).css("z-index",l+3).prev(item).css("z-index",l+2)},bullets:function(){item.css("z-index",l+1).eq(active).css("z-index",l+2);item.eq(step).css("z-index",l+3)},trigger:function(){if(z==1){slider.zindex.next()}else{if(z==-1){slider.zindex.prev()}else{if(z==0){slider.zindex.bullets()}}}}},slide:{left:function(sign){sets.animationStart.call(this);item.eq(step).animate({left:sign+"="+w},sets.animationSpeed,function(){slider.zindex.trigger()}).animate({left:0},sets.animationSpeed+200,function(){sets.animationComplete.call(this)})},top:function(sign){sets.animationStart.call(this);item.eq(step).animate({top:sign+"="+h},sets.animationSpeed,function(){slider.zindex.trigger()}).animate({top:0},sets.animationSpeed+200,function(){sets.animationComplete.call(this)})},fade:function(){sets.animationStart.call(this);item.fadeOut(sets.animationSpeed).eq(step).fadeIn(sets.animationSpeed,function(){sets.animationComplete.call(this)})}},animation:{previous:function(){step==0?step=l:step--;z=-1;switch(sets.transition){case"horizontal":slider.slide.left("-");break;case"vertical":slider.slide.top("+");break;case"fade":slider.slide.fade();break}},next:function(){step==l?step=0:step++;z=1;switch(sets.transition){case"horizontal":slider.slide.left("+");break;case"vertical":slider.slide.top("-");break;case"fade":slider.slide.fade();break}}},autoplay:function(){play=setInterval(function(){slider.animation.next();if(sets.bullets){setTimeout(function(){slider.bullets.update()},sets.animationSpeed+300)}},sets.autoplaySpeed)},pause:function(){clearInterval(play)},bullets:{create:function(){$t.append($("<div />").addClass("sliderBullets"));bullets=$t.find(".sliderBullets");for(i=0;i<=l;i++){bullets.append($("<a />").attr({href:"#",rel:i}).text(i))}},trigger:function(){bullet=bullets.find("a");bullet.eq(0).addClass("active");bullet.click(function(){var b=$(this),rel=b.attr("rel");active=bullet.filter(".active").attr("rel");step=rel;sign=rel>active?"+":"-";z=0;if(!b.hasClass("active")){switch(sets.transition){case"horizontal":slider.slide.left(sign);break;case"vertical":slider.slide.top(sign);break;case"fade":slider.slide.fade();break}}bullet.removeClass("active");b.addClass("active");return false})},update:function(){bullet.removeClass("active").eq(step).addClass("active")}},arrows:{create:function(){$t.append($("<div />").addClass("sliderArrows"));arrows=$t.find(".sliderArrows");arrows.append($("<a />").attr("href","#").addClass(sets.prev).text("Previous"));arrows.append($("<a />").attr("href","#").addClass(sets.next).text("Next"))},trigger:function(){arrows.find("."+sets.prev).click(function(){slider.animation.previous();if(sets.bullets){slider.bullets.update()}return false});arrows.find("."+sets.next).click(function(){slider.animation.next();if(sets.bullets){slider.bullets.update()}return false});if(sets.arrowsHide){arrows.hide();$t.hover(function(){arrows.show()},function(){arrows.hide()})}}},triggers:function(){if(sets.arrows){slider.arrows.trigger()}if(sets.bullets){slider.bullets.trigger()}if(sets.pauseOnHover){$t.hover(function(){slider.pause()},function(){slider.autoplay()})}}};slider.init()})}}(jQuery));
