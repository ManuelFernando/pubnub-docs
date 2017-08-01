var pubnub = null;

var app = {
  initialize: function() {
    this.bindEvents();
  },
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  onDeviceReady: function() {
    pubnub = new PubNub({
      publishKey: 'YOUR PUBLISH KEY',
      subscribeKey: 'YOUR SUBSCRIBE KEY'
    });

    pubnub.subscribe({ channels: ['channel1'] });

    app.setupPush();
  },
  setupPush: function() {
    var push = PushNotification.init({
      "android": {
        "senderID": "XXXXXXXX"
      },
      "browser": {},
      "ios": {
        "sound": true,
        "vibration": true,
        "badge": true
      },
      "windows": {}
    });

    push.on('registration', function(data) {
      console.log('registration event: ' + data.registrationId);

      pubnub.push.addChannels({
          channels: ['channel1'],
          device: data.registrationId,
          pushGateway: 'apns'
        },
        function(status) {
          console.log(status);
        });

      var oldRegId = localStorage.getItem('registrationId');

      if (oldRegId !== data.registrationId) {
        localStorage.setItem('registrationId', data.registrationId);
      }

      var parentElement = document.getElementById('registration');
      var listeningElement = parentElement.querySelector('.waiting');
      var receivedElement = parentElement.querySelector('.received');

      listeningElement.setAttribute('style', 'display:none;');
      receivedElement.setAttribute('style', 'display:block;');
    });

    push.on('error', function(e) {
      alert("push error = " + e.message);
    });

    push.on('notification', function(data) {
      console.log('notification event');
      navigator.notification.alert(
        data.message,         // message
        null,                 // callback
        data.title,           // title
        'Ok'                  // buttonName
      );
    });
  }
};
