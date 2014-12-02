Template.tags.helpers({
		
  		  tags: function() {
  		  	  return MyTags.find({}, {sort: {'name':-1}});
  		  },//end of tags
  		  
  		  tracks: function(){
  		  	  var activeTag = Session.get( 'activeTag' );
  		  	  return MyTracks.find({'tags': {$in: [activeTag]}});
  		  }//end of tracks
  		  
});//end of Template.tags.helpers

Template.tags.events({
	'click .tag': function( event ){
		$( '#track-list' ).removeClass( 'hidden' );
		Session.set( 'activeTag', this.name );
	},
	
	'change li': function( event ){
		console.log( this );	
	}
});


