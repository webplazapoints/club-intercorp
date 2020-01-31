function Preferences(){

}

Preferences.prototype.init = function(){
	this.tabs();
	this.menuPrefs();
}

Preferences.prototype.tabs = function(){
	$('.tabs span').click(function(e){
		var t = $(e.target);
		var tab = t.attr('data-tab');
		$('.form-tabs [data-content="' + tab + '"]').siblings('[data-content]').fadeOut(function(){
			$('.form-tabs [data-content="' + tab + '"]').fadeIn();
		});

		t.addClass('active').siblings().removeClass('active');
	})
}

Preferences.prototype.menuPrefs = function(){
	$('.menu-prefs li').click(function(e){
		var t = $(e.target);
		if(window.innerWidth > 880) {
			t = t.is('li') ? t : t.closest('li');
			var menu = t.attr('data-form');
			var form = $('.forms [data-form="' + menu + '"]');
			form.siblings().fadeOut();
			form.siblings().removeClass('open');
			setTimeout(function(){
				form.fadeIn();
				form.addClass('open');
			}, 400);
			t.addClass('active').siblings().removeClass('active');
		}
	});

	$('[data-form] h2').click(function(e) {
		var t = $(e.target);
		t.parent('[data-form]').siblings().children('div').slideUp();
		t.siblings('div').slideDown(function(){
			t.parent('[data-form]').addClass('open').siblings().removeClass('open');
		});

		console.log(t.parent().index());
		var index = t.parent().index();
		$('.menu-prefs li').eq(index).addClass('active').siblings().removeClass('active');
		// $('[data-form="' + index + '"]').show()
	});

	$(window).resize(function(){
		if(window.innerWidth <= 880) {
			$('[data-form]').show();
			$('[data-form]:not(.open) > div').hide();
		}
		else {
			$('[data-form].open').show().siblings().hide();
			$('[data-form] > div').show();
		}
	});
}