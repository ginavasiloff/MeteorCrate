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
  			var title;
  			var album;
  			var artist;
  			var isrc = $( event.currentTarget ).parent().attr('id');
  			var input = $('#' + isrc + ' input').val();
  			var track = MyTracks.findOne({'isrc': isrc});
  			if ( MyTags.findOne({'tag':input}) ){
  				id = MyTags.findOne({'tag':input})._id;
  				MyTags.update({_id:id},{$addToSet:{'songs':isrc}});
  			}
  			else{
  				MyTags.insert(  {	'tag': input, 'songs': [isrc] } );
  			}
  			
  			if ( track ) {
  				id = track._id;
  				MyTracks.update( {_id: id}, {$addToSet: {'tags': input}} );
  			}
  			else{
  				title = this.title.name;
  				album = this.album;
  				artist = this.artists[0].name;
  				MyTracks.insert( {'isrc': isrc, 'artist': artist, 'album': album.title, 'title': title, 'tags': [input]} );
  			}
  			
  		},
  		
  		'click .fa-remove': function(event){
  			//var id = event.target.id;
  			//MyTracks.remove({_id:id});
  		}
});//end of Template.track.events
