Template.track.helpers({
  		  tags: function(){
  		  	 var isrc = this.isrc;
  		  	 var track = MyTracks.findOne({'isrc' : isrc});
  		  	 if ( track ){
  		  	 	return track.tags;
  		  	 }
  		  	 else {
  		  	 	 return false;
  		  	 }
  		  }
  		  
});//end of Template.track.helpers
  
Template.track.events({
		
		// display the text box to enter a new tag
  		'click .track .fa-tag': function(event){
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
  			if ( MyTags.findOne({'tag':input}) ){
  				id = MyTags.findOne({'tag':input})._id;
  				MyTags.update({_id:id},{$addToSet:{'songs':isrc}});
  			}
  			else{
  				MyTags.insert(  {	'tag': input, 'songs': [isrc] } );
  			}
  			
  			if ( MyTracks.findOne({'isrc': isrc}) ) {
  				id = MyTracks.findOne( {'isrc': isrc} )._id;
  				MyTracks.update( {_id: id}, {$addToSet: {'tags': input}} );
  			}
  			else{
  				MyTracks.insert( {'isrc': isrc, 'tags': [input]} );
  			}
  			
  		},
  		
  		'click .fa-remove': function(event){
  			//var id = event.target.id;
  			//MyTracks.remove({_id:id});
  		}
});//end of Template.track.events
