Template.tags.helpers({
		
  		  tags: function() {
  		  	  return MyTags.find({}, {sort: {'tag':-1}});
  		  },//end of tags
  		  
  		  tracks: function( ){
  		  	  var activeTrack = Session.get( 'activeTrack' );
  		  	  if( activeTrack.songs ){
  		  	  	  var taggedSongs = [];
  		  	  	  activeTrack.songs.forEach( function( song ){
  		  	  	  		taggedSongs.push( MyTracks.findOne( {'isrc': song}) );
  		  	  	  });
  		  	  	  return taggedSongs;
  		  	  }
  		  	  else{
  		  	  	  return false;
  		  	  }
  		  }//end of tracks
  		  
});//end of Template.tags.helpers

Template.tags.events({
	'click .tag': function( event ){
		$( '#track-list' ).removeClass( 'hidden' );
		Session.set( 'activeTrack', this );
	}
});


