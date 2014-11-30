Template.search.helpers({
    results: function(){
    	 tracks = Tracks.find({}, {sort: {popularity: -1}}).fetch();
    	 return tracks;
     }
});//end of Template.search.helpers

Template.search.events({
 'submit #search': function (event) {
	event.preventDefault();
	var searchTerms = $('input').val();
	var query = $('input').val(); 
	Meteor.call('searchSpotify',query, function(error,result){
		//TODO: Check Status Code for success or failure
	});

 },
 
});//end of Template.search.events
