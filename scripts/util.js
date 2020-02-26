$(function () {
	readLayout();
	icDropdown();
	icTextfield();
	icCheckbox();
	icRadio();
	icAccordeon();
	showContact();
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

function goHome(){
	$('#logo').click(function(){
		console.log('click logo')
		location.href = "/views/home.html";
	})
}

function icDropdown() {
	var open = false;
	// if(window.innerWidth > 600) {
		$('.ic-dropdown').click(function (ev) {
			var t = $(ev.target);
			var container = t.closest('.ic-dropdown');
			if (!open) {
				container.addClass('open');
				container.find('.ic-droplist').show('fast');
				open = true;
			}
			else {
				$('.ic-dropdown .ic-droplist').hide('fast');
				$('.ic-dropdown').removeClass('open');
				open = false;
				if (!t.is('.disabled') || !t.is('.ic-droplist')) {
					container.removeClass('open');
					container.find('.ic-droplist').hide('fast');
					open = false;
				}
			}
		});

		// $('.ic-dropdown .ic-dropdown-mobile').change(function(e){
		// 	var t = $(e.target);
		// 	var value = t.val();
		// 	var option = t.find('option[value="' + value + '"]').text();
		// 	var container = t.closest('.ic-dropdown');
		// 	container.find('input:text').val(option);
		// 	container.addClass('edited');
		// 	container.find('.ic-droplist').hide();
		// 	container.removeClass('open');
		// });
	
		$('.ic-dropdown .ic-dropitem').click(function (ev) {
			var t = $(ev.target);
			var value = t.attr('data-value');
			var container = t.closest('.ic-dropdown');
			container.find('input:text').val(t.text());
			container.find('input:hidden').val(value);
			container.addClass('edited');
			container.find('.ic-dropdown-mobile').val(value);
		});

		$('body').on('click', function (ev) {
			var t = $(ev.target);
			if (!t.closest('.ic-dropdown').is('.ic-dropdown') && !t.is('.ic-dropdown') && !t.is('.disabled') && open) {
				$('.ic-dropdown .ic-droplist').hide('fast');
				$('.ic-dropdown').removeClass('open');
				open = false;
			}
		});
	// }
}

function icTextfield() {
	$('.ic-textfield input:text, .ic-textfield input:password, .ic-textarea textarea').focusin(function (ev) {
		var t = $(ev.target);
		t.closest('.ic-textfield, .ic-textarea').addClass('focus');
	});

	$('.ic-textfield input:text, .ic-textfield input:password, .ic-textarea textarea').focusout(function (ev) {
		var t = $(ev.target);
		t.closest('.ic-textfield, .ic-textarea').removeClass('focus');
	});

	$('.ic-textfield input:text, .ic-textfield input:password, .ic-textarea textarea').on('input', function (ev) {
		var t = $(ev.target);
		var edited = t.val() != '' ? true : false;
		if (edited) { t.closest('.ic-textfield, .ic-textarea').addClass('edited'); }
		else { t.closest('.ic-textfield, .ic-textarea').removeClass('edited'); }
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
		$(modal).find('.content-modal').removeClass('visible');
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
		if(window.innerWidth > 700) {
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
		}
		else {
			$('#menu-mobile').fadeIn('fast', function(){
				$('#menu-mobile .content').addClass('visible');
			});
		}
	});

	$('#menu-mobile').click(function(ev){
		var t = $(ev.target);
		if(t.is('.close-menu') || t.is('#menu-mobile')) {
			$('#menu-mobile .content').removeClass('visible');
			setTimeout(function(){
				$('#menu-mobile').fadeOut('fast');
			}, 250);
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

function showContact(){
	icModal('#modal-contact', 'show');
}

function showSearcherMobile() {
	$('.search-mb-open').fadeToggle('fast').css({display: 'block'});
	$(window).resize(function(){
		if(window.innerWidth > 700) { $('.search-mb-open').removeAttr('style'); }
	})
}

function cantLogin(){
	icModal('#modal-cantlogin', 'show');
}

function isValid(entry, regex){
   
	return regex.test(entry);
}

function icValidateForm(form){
	var regexEmpty = /(?!^$|\s+)/;
	var regexDni = /^[0-9]{8}$/;
	var regexDocument = /^[A-Za-z0-9]{1,15}$/;
	var regexPhone = /^[0-9]{7,15}$/;
	var regexName = /^([A-Za-záéíóúÁÉÍÓÚñÑ ]){1,250}$/;
	var regexEmail = /^[a-zA-Z0-9\.\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+\@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}$/;
	var regexGender = /^[MF]{1}$/;

	var fields = $(form).find('[data-validate]');
	$(form).find('.label-error').remove();

	$.each(fields, (index, value) => {
			var v = $(value);
			var type = v.attr('data-type');
			var errorMessage = v.attr('data-message');

			var entry;
			if(v.is('.ic-textfield')) { entry = v.find('input:text, input:password').val(); }
			else if(v.is('.ic-drop-group')) { entry = v.find('.ic-drop-group').val(); }
			else if(v.is('.ic-dropdown')) { entry = v.find('input:text').val() }

			var finalRegex;
			switch(type){
					case 'dni': finalRegex = regexDni; break;
					case 'document': finalRegex = regexDocument; break;
					case 'phone': finalRegex = regexPhone; break;
					case 'drop': finalRegex = regexEmpty; break;
					case 'name': finalRegex = regexName; break;
					case 'email': finalRegex = regexEmail; break;
					case 'gender': finalRegex = regexGender; break;
					default: finalRegex = regexEmpty;
			}

			if(isValid(entry, finalRegex)){
					v.removeClass('error');
					v.attr('data-validate', true);
			}
			else {
					v.addClass('error');
					v.append(`<span class="label-error">${errorMessage}</span>`);
					v.attr('data-validate', false);
			}
	});

	fields = $(form).find('[data-validate="false"]');
	return fields.length == 0;
}

function emptyValuesForm(form){
	var fields = $(form).find('.ic-textfield, .ic-dropdown');
	const interval = setInterval(() => {
			if(fields.length > 0) {
					$.each(fields, (index, value) => {
							var ipt = $(value).find('input:text');
							if(ipt.val() != '') {
									$(ipt).parent().addClass('focus');
							}
					});
					clearInterval(interval);
			}
	}, 100);
}

function submitEnviar(e) {
	var t = $(e);
	t.find('span').hide();
	t.find('.ic-button-loader').show();
	setTimeout(function(){
		t.find('.ic-button-loader').hide();
		t.find('span').show();
		t.closest('.content-modal').fadeOut();
		setTimeout(function(){
			$('.success-send').fadeIn().css({display: 'flex'});
		}, 250);
	}, 2000);

	$('.ok').click(function(e){
		var t = $(e.target);
		icModal('#modal-contact', 'hide');
	});
}

function paramToJson(){
	var url = location.href.split('?');
	var object = {};
	if(url.length > 1) {
		var qParams = url[1].split('&');
		qParams.forEach(function(_) {
			var key = _.split('=')[0];
			var value = _.split('=')[1];

			object[key] = value;
		});
	}
	
	return object;

}