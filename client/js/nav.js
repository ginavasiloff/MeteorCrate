Template.nav.events({
	'click #sign-in':	function(event){
		$('#sign-in-form').toggleClass('hidden');
	},
	
	'click #register': function(event){
		$('#register').addClass('hidden');
		$('#sign-in-form form').append('<input id="confirm-password" type="password" placeholder="confirm password" />');
		$('#sign-in-form').append('<span class="cancel action">I don\'t need to register.</a>');
	},
	
	'click .cancel': function(event){
		$('#confirm-password').remove();
		$('.cancel').remove();
		$('#register').removeClass('hidden');
	},
	
	'click .fa-close': function(event){
		$('.cancel').click();
		$('#sign-in').click();
	}
});
