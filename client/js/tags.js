Template.tags.helpers({
		
  		  tags: function() {
  		  	  var tags = [];
  		  	  var tagCollection = MyTracks.find({},{fields: {'tags': 1}}).fetch();
  		  	  
  		  	  for( var i=0; i < tagCollection.length; i++){
  		  	  		var tagArray = tagCollection[i].tags;  
  		  	  		for( var j=0; j < tagArray.length; j++){
  		  	  			var tagExists = false;
  		  	  			for( var k=0; k < tags.length; k++ ){
  		  	  				if( tags[k] == tagArray[j] ){
  		  	  					tagExists = true;
  		  	  				}
  		  	  			}
  		  	  			if( !tagExists ){
  		  	  				tags.push( tagArray[j] );
  		  	  			}
  		  	  		}
  		  	  }
  		  	  return tags;
  		  },//end of tags
  		  
  		  tracks: function(){
  		  	  var activeTag = Session.get( 'activeTag' );
  		  	  return MyTracks.find({'tags': {$in: [activeTag]}});
  		  }//end of tracks
  		  
});//end of Template.tags.helpers

Template.tags.events({
		
	//update the active tag
	'click .tag': function( event ){
		$( '#track-list' ).removeClass( 'hidden' );
		var tag = JSON.stringify( this );
		tag = tag.replace(/['"]+/g, '');
		Session.set( 'activeTag', tag );
	},
	
	'change li': function( event ){
		console.log( this );	
	}
});


