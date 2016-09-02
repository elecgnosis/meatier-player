var player = null;

function setPlyaer() {
  player = new AV.Player();
}

// function set
// $('#song').on('change', function(e) {
//
// });

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.app.onRendered(setPlayer);

  Template.app.events({
    'change #song': function(e) {
      console.log(e);
      var song = document.querySelector('#song').files[0];
      player.fromFile(song);
      player.play();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
