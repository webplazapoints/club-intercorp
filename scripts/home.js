function Home(){

}

Home.prototype.init = function(){
	activeMenu('.home');
	icModal('#modal-destacados', 'show');
	this.banner();
	this.destacados();
}

Home.prototype.banner = function(){
	var bannerCount = $('.banner').length;
	var counter = 1;
	
	var disappear = function(banner){
		banner = $(banner);
		banner.find('.content').fadeOut(function(){
			banner.fadeOut('slow');
			setTimeout(function(){
				banner.removeClass('current');
			}, 250);
		});
	}

	var appear = function(banner){
		banner = $(banner);
		banner.fadeIn('slow', function(){
			banner.find('.content').fadeIn();
			banner.addClass('current');
		}).css({display: 'flex'});
	}

	var fnInterval = function(){
		var current = $('.banner.current');
		var sib = current.next();
		counter++;

		if(counter > bannerCount) {
			counter = 1;
			sib = $('.banner').first();
		}
		
		disappear(current);
		setTimeout(function(){
			appear(sib);
		}, 250);
	};
	var interval = setInterval(fnInterval, 7000);

	$('#banner .handler').click(function(e){
		var t = $(e.target);
		var current = $('.banner.current');
		var sib;

		clearInterval(interval);
		interval = setInterval(fnInterval, 7000);

		if(t.attr('data-handler') == 'next') {
			counter++;
			sib = current.next();
		}
		else if (t.attr('data-handler') == 'prev'){
			counter--;
			sib = current.prev();
		}

		if(counter > bannerCount) {
			counter = 1;
			sib = $('.banner').first();
		}

		if(counter < 1) {
			counter = bannerCount;
			sib = $('.banner').last();
		}

		disappear(current);
		setTimeout(function(){
			appear(sib);
		}, 250);
	});
}

Home.prototype.destacados = function(){

	var glide = new Glide('#modal-destacados .glide', {
		perView: 3,
		type: 'carousel',
		breakpoints: {
			850: {
				perView: 2,
				peek: { before: 0, after: 70 }
			},
			700: {
				perView: 1,
				peek: { before: 0, after: 70 }
			}
		}
	}).mount();

	glide.on('run.after', function(){
		var index = $('.glide__bullet--active').index();
		var total = $('.glide__bullet').length;

		$('.glide__counter').text((index + 1) + ' de ' + total);
	});
}