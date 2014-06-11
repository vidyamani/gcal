if (Meteor.isClient) {
  Accounts.ui.config({requestPermissions: {google:
                                           ['https://www.googleapis.com/auth/calendar',
                                            'https://www.googleapis.com/auth/calendar.readonly',
                                            'https://www.googleapis.com/auth/userinfo.profile']}, requestOfflineToken: {google: true}});

  Template.hello.greeting = function () {
    return "Welcome to gcal.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined') {
        console.log("You pressed the button");
      }
      ret = Meteor.call('getCalendarList');
      console.log(ret);
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    getCalendarList : function() {
      console.log(Meteor.user().services.google.accessToken);
      var url = "https://www.googleapis.com/calendar/v3/users/me/calendarList";
      var auth =  'Bearer ' + Meteor.user().services.google.accessToken;
      var apiHeader = {'Authorization': auth, 'Content-Type': 'application/json' }

      var result = Meteor.http.get(url, {
        // params: {key: "YOUR-API-KEY-HERE"},
        params: {key: "AIzaSyC0vOROUuG48Y4c_OA5CBPlp-apJG7cgQA"},
        headers: apiHeader
      } );

      var items = result.data.items;
      console.log(items.length);
      return items.length;
    }
  });
}
