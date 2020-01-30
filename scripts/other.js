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
		t = t.is('li') ? t : t.closest('li');
		var menu = t.attr('data-form');
		var form = $('.forms [data-form="' + menu + '"]');
		form.siblings().fadeOut();
		setTimeout(function(){
			form.fadeIn();
		}, 400);
		t.addClass('active').siblings().removeClass('active');
	});
}