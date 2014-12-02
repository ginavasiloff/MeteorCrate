Tracks = new Mongo.Collection('tracks');
MyTags = new Mongo.Collection('myTags');
MyTracks = new Mongo.Collection('myTracks');

if( Meteor.isServer ){
	
	Meteor.publish("tracks", function () {
			return Tracks.find({});
	});
	
	Meteor.publish("myTags", function () {
			return MyTags.find({});
	});	
	
	Meteor.publish("myTracks", function () {
			return MyTracks.find({});
	});	
	
}

if( Meteor.isClient ){
	Meteor.subscribe("tracks");
	Meteor.subscribe("myTags");
	Meteor.subscribe("myTracks");
}
