Tracks = new Mongo.Collection('tracks');
MyTracks = new Mongo.Collection('myTracks');

if( Meteor.isServer ){
	
	Meteor.publish("tracks", function () {
			return Tracks.find({});
	});
	
	Meteor.publish("myTracks", function () {
			return MyTracks.find({});
	});	
	
}

if( Meteor.isClient ){
	Meteor.subscribe("tracks");
	Meteor.subscribe("myTracks");
}
