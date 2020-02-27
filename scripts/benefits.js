function Benefits(){

}

Benefits.prototype.init = function(){
	activeMenu('.benefits');
	this.filters();
	this.setCategories();
	this.glideBrands();
}

Benefits.prototype.filters = function(){
	$('#filter-mb').click(function() {
		icModal('#modal-filter', 'show');
	});
}

Benefits.prototype.setCategories = function(){
	var params = paramToJson();

	if(params.categoria) {
		var arCategories = params.categoria.split(',');
		arCategories.forEach(function(category){
			var container = $('[data-category="' + category + '"]');
			container.addClass('on');
			container.find('.far').attr({class: 'fas fa-check-square'});
		});

		var title = params.categoria;
		switch (title) {
			case 'compras' : title = 'Compras'; break;
			case 'educacion' : title = 'Educación'; break;
			case 'restaurantes' : title = 'Restaurantes'; break;
			case 'familia' : title = 'Familia y Salud'; break;
			case 'entretenimiento' : title = 'Entretenimiento'; break;
			case 'tecnologia' : title = 'Tecnología'; break;
			case 'finanzas' : title = 'Productos financieros'; break;
			case 'viajes' : title = 'Viajes'; break;
			default: title = '';
		}
		$('.category-title').text(title);
	}

	if(params.marca) {
		var arBrands = params.marca.split(',');
		arBrands.forEach(function(brand){
			var container = $('[data-brand="' + brand + '"]');
			container.addClass('on');
			container.find('.far').attr({class: 'fas fa-check-square'});
		});
	}
}

Benefits.prototype.glideBrands = function(){
	var mounted = true;
	var brandSlider = new Glide('#glide-brands.glide', {
		perView: 10,
		peek: {before: 0, after: 70},
		rewind: false,
		breakpoints: {
			1080: {perView: 8},
			880: {perView: 6},
			680: {perView: 4},
			480: {perView: 2}
		}
	}).mount();

	var size = $('.glide__slides').width();
	// mountGlide();

	// $(window).on('resize', function(){
	// 	mountGlide();
	// });
	
	// function mountGlide(){
	// 	console.log(window.innerWidth, size);
	// 	if(window.innerWidth > size) {
	// 		if(mounted) {
	// 			console.log(1)
	// 			brandSlider.destroy();
	// 			mounted = false;
	// 		}
	// 	}
	// 	else {
	// 		console.log(2)
	// 		if(!mounted) {
	// 			brandSlider.mount();
	// 			mounted = true;
	// 		}
	// 	}
	// }
	
}

function BenefitDetail(){

}

BenefitDetail.prototype.init = function(){
	activeMenu('.benefits');
	this.tabs();
	this.generateCoupon();
}

BenefitDetail.prototype.tabs = function(){
	$('.tabs span').click(function(e){
		var t = $(e.target);
		var tab = t.attr('data-tab');
		var content = $('.information .content [data-content="' + tab + '"]');
		
		t.addClass('active').siblings().removeClass('active');
		content.siblings().fadeOut().fadeOut(function(){
			content.fadeIn();
		});
	})
}

BenefitDetail.prototype.generateCoupon = function(){
	$('#generateModal').click(function(){
		icModal('#modal-cupon', 'show');
	});

	$('#generateCoupon').click(function(e){
		var t = $(e.target);
		t.find('span').addClass('hide');
		t.find('.ic-button-loader').show();
		setTimeout(function() {
			// t.closest('.content-modal:not(.success-send)').hide();
			// t.closest('.content-modal').siblings('.success-send').show().css({display: 'flex'});
			t.find('.ic-button-loader').hide();
			t.find('span').removeClass('hide');
			icModal('#modal-cupon', 'show');
		}, 2000);
	});

	$('.ok').click(function(e){
		var t = $(e.target);
		icModal('#modal-cupon', 'hide');
	});
}