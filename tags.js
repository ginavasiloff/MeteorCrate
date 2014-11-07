Tracks = new Mongo.Collection('tracks');
MyTags = new Mongo.Collection('myTags');

if (Meteor.isClient) {

  Template.search.helpers({
    results: function(){
    	 tracks = Tracks.find({}, {sort: {popularity: -1}}).fetch();
    	 return tracks;
     }
  });

  Template.search.events({
    'submit #search': function (event) {
      event.preventDefault();
      var searchTerms = $('input').val();
      var query = $('input').val(); 
      Meteor.call('searchSpotify',query, function(error,result){
			//TODO: Check Status Code for success or failure
		});

    },
  });
  Template.tags.helpers({
  		  tags: function() {
  		  	  return MyTags.find({}, {sort: {'tag':-1}});
  		  }
  });
  Template.track.helpers({
  		  tags: function(){
  		  	 var isrc = this.isrc;
  		  	  return MyTags.find({'isrc' : isrc}).fetch();
  		  }
  });
  
  Template.track.events({
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
  			var isrc = $( event.currentTarget ).parent().attr('id');
  			var input = $('#' + isrc + ' input').val();
  			var tag = {	'tag': input,
  							'isrc': isrc
  			};
  			MyTags.insert( tag );
  		}
  });
  

   
}

if (Meteor.isServer) {
	processResult = function(result){
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
  	}
  
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
  });
}                                              
