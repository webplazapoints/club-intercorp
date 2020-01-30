$(function () {
	readLayout();
	icDropdown();
	icTextfield();
	icCheckbox();
	icRadio();
	icAccordeon();
});

function readLayout() {

	$.get('../layout/scripts.html', function (scripts) {
		$('html body').append(scripts);
	});

	$.get('../layout/props.html', function (props) {
		$('html head').html(props);
	});

	$.get('../layout/header.html', function (header) {
		$('html header').html(header);
	});

	$.get('../layout/footer.html', function (footer) {
		$('html footer').html(footer);
	});

}

function icDropdown() {
	var open = false;
	if(window.innerWidth > 600) {
		$('.ic-dropdown').click(function (ev) {
			var t = $(ev.target);
			var container = t.closest('.ic-dropdown');
			if (!open) {
				container.addClass('open');
				container.find('.ic-droplist').show('fast');
				open = true;
			}
			else {
				if (!t.is('.disabled') || !t.is('.ic-droplist')) {
					container.removeClass('open');
					container.find('.ic-droplist').hide('fast');
					open = false;
				}
			}
		});
	
		$('.ic-dropdown .ic-dropitem').click(function (ev) {
			var t = $(ev.target);
			var value = t.attr('data-value');
			var container = t.closest('.ic-dropdown');
			container.find('input:text').val(t.text());
			container.find('input:hidden').val(value);
			container.addClass('edited');
		});
	}
}

function icTextfield() {
	$('.ic-textfield input:text, .ic-textfield input:password').focusin(function (ev) {
		var t = $(ev.target);
		t.closest('.ic-textfield').addClass('focus');
	});

	$('.ic-textfield input:text, .ic-textfield input:password').focusout(function (ev) {
		var t = $(ev.target);
		t.closest('.ic-textfield').removeClass('focus');
	});

	$('.ic-textfield input:text, .ic-textfield input:password').on('input', function (ev) {
		var t = $(ev.target);
		var edited = t.val() != '' ? true : false;
		if (edited) { t.closest('.ic-textfield').addClass('edited'); }
		else { t.closest('.ic-textfield').removeClass('edited'); }
	});

	$('.ic-textfield .show-password').click(function (ev) {
		var t = $(ev.target);
		var show = t.attr('data-show');
		show = (show == 'false') ? false : true;
		if (!show) {
			t.siblings('input:password').attr({ type: 'text' });
			t.removeClass('fa-eye-slash').addClass('fa-eye');
			t.attr('data-show', true);
		}
		else {
			t.siblings('input:text').attr({ type: 'password' });
			t.removeClass('fa-eye').addClass('fa-eye-slash');
			t.attr('data-show', false);
		}
	});
}

function icCheckbox() {
	$('.ic-checkbox input:checkbox').change(function (ev) {
		var t = $(ev.target);
		var container = t.closest('.ic-checkbox');
		var checked = t.is(':checked');
		if (checked) {
			container.addClass('on');
			container.find('.far').attr({ class: 'fas fa-check-square' });
		}
		else {
			container.removeClass('on');
			container.find('.fas').attr({ class: 'far fa-square' });
		}
	})
}

function icRadio(){
	$('.ic-radio input:radio').change(function(ev){
		var t = $(ev.target);
		var name = t.attr('name');
		var arRadio = $('.ic-radio input:radio[name="' + name + '"]');
		console.log(arRadio);
		
		$.each(arRadio, function(index, value) {
			var checked = $(value).is(':checked');
			if (checked) {
				$(value).parent('label').addClass('on');
				$(value).siblings('.far').attr({ class: 'fas fa-dot-circle' });
			}
			else {
				$(value).parent('label').removeClass('on');
				$(value).siblings('.fas').attr({ class: 'far fa-circle' });
			}
		});
	});
}

function icModal(modal, action) {
	if (action == 'show') {
		$(modal).fadeIn('fast', function (ev) {
			$(modal).find('.content-modal').addClass('visible');
			disableScroll();
		}).css({ display: 'flex' });
	}
	else if (action == 'hide') {
		$(modal).find('.content-modal').addClass('visible');
		setTimeout(function () {
			$(modal).fadeOut('fast');
			enableScroll();
		}, 150);
	}

	$('.close-modal').click(function (ev) {
		var t = $(ev.target);
		var modal = t.closest('.ic-modal');
		modal.find('.content-modal').removeClass('visible');
		setTimeout(function () {
			modal.fadeOut('fast');
			enableScroll();
		}, 150);
	});

	$('.ic-modal').click(function (ev) {
		var t = $(ev.target);
		if (t.is('.ic-modal')) {
			t.find('.content-modal').removeClass('visible');
			setTimeout(function () {
				t.fadeOut('fast');
				enableScroll();
			}, 150);
		}
	});
}

function disableScroll() {
	$('html,body').css({
		maxHeight: '100vh',
		overflow: 'hidden'
	});
}

function enableScroll() {
	$('html,body').removeAttr('style');
}

function userDropdown() {
	var showed = false;
	$('body').on('click', function (ev) {
		var t = $(ev.target);
		if (!t.closest('.user').is('.user') && !t.is('.user') && showed) {
			$('.user-dropdown').hide('fast');
			$('header .user .fas').removeClass('showed');
			showed = false;
		}
	});

	$('header .user .initials, header .user .fas').click(function (ev) {
		if (!showed) {
			$('.user-dropdown').show('fast');
			$('header .user > .fas').addClass('showed');
			showed = true;
		}
		else {
			$('.user-dropdown').hide('fast');
			$('header .user > .fas').removeClass('showed');
			showed = false;
		}
	});
}

function openMenuFooter(e){
	if(window.innerWidth <= 480) {
		e = $(e);
		e.nextAll().slideToggle();
		e.find('.fas').toggleClass('open');
	}

	$(window).resize(function(){
		$('.menus ul li').removeAttr('style');
		$('.menus ul li .fas').removeClass('open');
	});
}

function activeMenu(menu){
	$(menu).addClass('active').siblings().removeClass('active');
}

function icAccordeon(){
	$('.accordeon-button').click(function(e){
		var t = $(e.target);
		t.parent('.group').siblings('.group').find('.accordeon-content').slideUp('fas');
		t.siblings('.accordeon-content').slideDown('fast');
		t.parent('.group').addClass('active').siblings('.group').removeClass('active');
	});
}