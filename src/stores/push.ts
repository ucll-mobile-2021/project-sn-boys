import 'phonegap-plugin-push'

const push = PushNotification.init({
    android: {
    },
    ios: {
        alert: "true",
        badge: true,
        sound: 'false',
    },
    windows: {}
});

push.on('registration', (data) => {
	console.log(data.registrationId);
});


push.on('notification', (data) => {
    console.log('notification event');
	console.log(data.message);
	console.log(data.title);
    push.finish(function(){
        console.log("processing of push data is finished")
    })
});/*
  push.on('notification', function(data) {
    console.log('notification event');
    navigator.notification.alert(
      data.message,         // message
      null,                 // callback
      data.title,           // title
      'Ok'                  // buttonName
    );
  });
*/
  push.on('error', function(e) {
    console.log("push error = " + e.message);
  });
