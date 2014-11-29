/**
 *	Set the program to a default state during startup.
 */
Meteor.startup( function(){
		Session.setDefault( 'activeTrack', false );
});
