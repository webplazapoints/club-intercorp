function Login(){
	
}

Login.prototype.init = function() {
	console.log('login');
	emptyValuesForm('#form-login');
	this.submitLogin();
}

Login.prototype.submitLogin = function(){
	$('#submitLogin').click(function(){
			if(icValidateForm('#form-login')) {
				location.href = './views/home.html';
			}
	});
}

function Register(){

}

Register.prototype.init = function(){
	emptyValuesForm('#form-register');
	this.handler();
	this.submitRegister();
}

Register.prototype.handler = function(){
	$('.open-tyc').click(function(){
		icModal('#modal-tyc', 'show');
	});

	$('.open-conditions').click(function(){
		icModal('#modal-tratamiento', 'show');
	});

	$('.choose-type').click(function(e){
		var t = $(e.target);
		var value = t.attr('data-value');
		var message, type;
		if(value == 0) {
			message = 'Ingrese un dni válido';
			type = 'dni';
		}
		else {
			message = 'Ingrese un documento válido';
			type = 'document';
		}

		t.closest('.ic-dropdown').siblings('#document-field').attr({
			'data-message': message,
			'data-type': type,
			'data-validate': false
		});
	})
}

Register.prototype.submitRegister = function(){
	$('#submitRegister').click(function(){
		if(icValidateForm('#form-register')) {
			location.href = './home.html';
		}
	});
}