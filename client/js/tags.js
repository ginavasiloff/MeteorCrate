Template.tags.helpers({
  		  tags: function() {
  		  	  return MyTags.find({}, {sort: {'tag':-1}});
  		  }
});//end of Template.tags.helpers

