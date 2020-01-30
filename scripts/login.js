function Login(){
	
}

Login.prototype.init = function() {
	console.log('login');
}

function Register(){

}

Register.prototype.init = function(){
	this.handler();
}

Register.prototype.handler = function(){
	$('.open-tyc').click(function(){
		icModal('#modal-tyc', 'show');
	});

	$('.open-conditions').click(function(){
		icModal('#modal-tratamiento', 'show');
	});
}