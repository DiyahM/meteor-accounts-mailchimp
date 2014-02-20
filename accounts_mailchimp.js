Accounts.oauth.registerService('mailchimp');

if (!Accounts.mailchimp) {
  Accounts.mailchimp = {};
}

if (Meteor.isClient) {
    Meteor.loginWithMailchimp = function(options, callback) {
        // support a callback without options
        if (! callback && typeof options === "function") {
            callback = options;
            options = null;
        }

        var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
        Mailchimp.requestCredential(options, credentialRequestCompleteCallback);
    };
} else {
    Accounts.addAutopublishFields({
        forLoggedInUser: ['services.mailchimp'],
        forOtherUsers: [
            'services.mailchimp.id'
        ]
    });
}
