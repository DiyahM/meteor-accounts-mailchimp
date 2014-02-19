Mailchimp = {};

Mailchimp.requestCredential = function (options, callback) {

    if (!callback && typeof options === 'function') {
        callback = options;
        options = {};
    }

    var config = ServiceConfiguration.configurations.findOne({service: 'mailchimp'});
    if (!config) {
        callback && callback(new ServiceConfiguration.ConfigError("Service not configured"));
        return;
    }

    var state = Meteor.uuid();

    var loginUrl =
        'https://login.mailchimp.com/oauth2/authorize' +
            '?response_type=code' +
            '&client_id=' + config.clientId +
            '&redirect_uri=' + Meteor.absoluteUrl('_oauth/mailchimp?close=close') +
            '&state=' + state; 
            

    Oauth.initiateLogin(state, loginUrl, callback);
};
