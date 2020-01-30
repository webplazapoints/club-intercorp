function Coupon(){

}

Coupon.prototype.init = function(){
	activeMenu('.coupons');
	this.tabs();
}

Coupon.prototype.tabs = function(){
	$('.tabs span').click(function(e){
		var t = $(e.target);
		var tab = t.attr('data-tab');
		$('.coupon-list [data-content="' + tab + '"]').siblings('[data-content]').fadeOut(function(){
			$('.coupon-list [data-content="' + tab + '"]').fadeIn().css({display: 'flex'});
		});

		t.addClass('active').siblings().removeClass('active');
	})
}