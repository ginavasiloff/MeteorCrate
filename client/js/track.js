Template.track.helpers({
  		  tags: function(){
  		  	 var isrc = this.isrc;
  		  	  return MyTags.find({'isrc' : isrc}).fetch();
  		  }
});//end of Template.track.helpers
  
Template.track.events({
  		'click .track .fa-tag': function(event){
  		// display the text box to enter a new tag
  			var isrc = $( event.currentTarget ).parent().attr('id');
  			if( $('#' + isrc + ' form').hasClass('hidden') ){
				$('.track form').addClass('hidden');
				$('#'+isrc + ' form').removeClass('hidden');
			}
			else{
				$('#' + isrc + ' form').addClass('hidden');
			}
  		},
  		'submit form': function(event){
  			var isrc = $( event.currentTarget ).parent().attr('id');
  			var input = $('#' + isrc + ' input').val();
  			if (! MyTags.findOne({'tag':input})){
  					MyTags.insert(  {	'tag': input, 'isrc': isrc } );
  			}
  			else{
  				var id = MyTags.findOne({'tag':input})._id;
  				MyTags.update({_id:id},{$addToSet:{'isrc':isrc}});
  			}
  		}
});//end of Template.track.events
