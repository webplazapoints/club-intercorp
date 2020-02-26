function Benefits(){

}

Benefits.prototype.init = function(){
	activeMenu('.benefits');
	this.filters();
	this.setCategories();
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