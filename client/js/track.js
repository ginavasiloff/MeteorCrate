Template.track.helpers({
  		  tags: function(){
  		  	 var isrc = this.isrc;
  		  	 var tags = MyTags.findOne({'isrc' : isrc}).tags;
  		  	return tags;
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
  			event.preventDefault();
  			var id;
  			var isrc = $( event.currentTarget ).parent().attr('id');
  			var input = $('#' + isrc + ' input').val();
  			if (!MyTags.findOne({'tag':input})){
  				MyTags.insert(  {	'tag': input, 'songs': [isrc] } );
  			}
  			else{
  				id = MyTags.findOne({'tag':input})._id;
  				MyTags.update({_id:id},{$addToSet:{'songs':isrc}});
  			}
  			if (!MyTracks.findOne({'isrc': isrc})){
  				MyTracks.insert({'isrc': isrc, 'tags': [input]});
  			}
  			else{
  				var id = MyTracks.findOne({'isrc': isrc})._id;
  				MyTracks.update({_id: id}, {$addToSet: {'tags': [input]}} );
  			}
  		},
  		
  		'click .fa-remove': function(event){
  			var id = event.target.id;
  			MyTags.remove({_id:id});
  		}
});//end of Template.track.events
