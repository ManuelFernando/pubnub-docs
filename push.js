var PubNub = require('pubnub');

var pubnub = new PubNub({
  publishKey: 'YOUR PUBLISH KEY HERE',
  subscribeKey: 'YOUR SUBSCRIBE KEY HERE'
});

var payload = {
  pn_apns: {
    aps : {
      alert: 'hi buddy!',
      badge: 1,
      sound: 'melody'
    }
  }
};

pubnub.publish({ message: payload, channel: 'channel1'}, function(err, res) {
  console.log(err);
  console.log(res);
});
