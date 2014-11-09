if (Meteor.isClient){
	Router.map(function(){
    this.route('tags', { path: 'tags'});
    this.route('home', { path: '/'});
    this.route('search', {path: 'search'});
});
}
