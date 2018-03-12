$(function(){
	
	let carousel = $(".carousel-ms");
	let liList = $(".carousel-ms li");
	let liFirst = carousel.find("li:first");
	let liLast = carousel.find("li:last");
	
	let dots = $(".dots");
	let dotFirst = dots.find("i:first");
	let dotLast = dots.find("i:last");	
	let dotList = $(".dots i");
	let dotsLength = dotList.length;

	function slide(target) {
		carousel.stop(true,true); 
		changeSlide(target);
	}

	let sliding = setInterval(slide, 5000);
	
	function changeSlide(target) {
		let liPrev = carousel.find("[data-li=active]");
		
		let liNext;
		if (liPrev.is(liLast)) {
			liNext = liFirst;
		} else {
			liNext = liPrev.next();
		}
		if (typeof target !== 'undefined') {
			liNext = liList.eq(target);
		}

		liList.css("z-index", 1);
		liPrev.css("z-index", 2).removeAttr("data-li").removeClass("li-fadeIn");
		liNext.css("z-index", 3).attr("data-li", "active").addClass("li-fadeIn");

		changeDot(target);
	}
	
	function changeDot(target) {
		let dotPrev = dots.find("[data-dot=active]");

		let dotNext;
		if (dotPrev.is(dotLast)) {
			dotNext = dotFirst;
		} else {
			dotNext = dotPrev.next();
		}
		if (typeof target !== 'undefined') {
			dotNext = dotList.eq(target);
		}
		
		dotPrev.removeClass("fa-circle").removeAttr("data-dot").addClass("fa-circle-thin");
		dotNext.removeClass("fa-circle-thin").attr("data-dot", "active").addClass("fa-circle");
	}
	
	dotList.click( function(){
		clearInterval(sliding);
		let dotIndex = dotList.index(this);
		slide(dotIndex);
		sliding = setInterval(slide, 5000);
	});
	
	dotList.mouseenter( function() {
		if ($(this).attr("data-dot") !== "active") {
			$(this).removeClass("fa-circle-thin").addClass("fa-circle");
		}
	})	
	
	dotList.mouseleave( function() {
		if ($(this).attr("data-dot") !== "active") {
			$(this).removeClass("fa-circle").addClass("fa-circle-thin");
		}
	});

});