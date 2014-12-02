function processResult(result){
  var tracks = JSON.parse(result.content).tracks;
  Tracks.remove({});
  for(i=0; i<tracks.length; i++){
	  var track = new Object;
	  track.title = { name: tracks[i].name,
							href: tracks[i].href
	  };
	  track.artists = tracks[i].artists;
	  if(track.popularity){
		  track.popularity = tracks[i].popularity;
	  }
		  
	  track.year = tracks[i].album.released;
	  track.album = { title: tracks[i].album.name,
							href: tracks[i].album.href
	  };
	  for(j=0; j<tracks[i]["external-ids"].length; j++){
		  var id = tracks[i]["external-ids"][j];
		  if(id.type == 'isrc'){
			  track.isrc = id.id;
			  break;
		  }                                       
	  }
	  if( !Tracks.findOne({isrc: track.isrc}) ){
		  Tracks.insert( track );
	  }
  }
}; //end of processResult

Meteor.methods({
searchSpotify: function(query){
	Tracks.remove({});
	this.unblock();
	var url = "http://ws.spotify.com/search/1/track.json?q=title:"+query;
	result = HTTP.get(url);
	if(result.content){
		processResult(result);
	}
	return result.statusCode;
}
});//end of Meteor.methods            

Meteor.startup( function(){
		MyTracks.remove({});
});
