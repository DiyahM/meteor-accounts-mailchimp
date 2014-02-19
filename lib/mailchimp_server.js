Mailchimp = {};

Oauth.registerService('mailchimp', 2, null, function(query) {

    var response    = getTokenResponse(query);
    console.log(response);
    var accessToken = response.access_token;

                
                
    var serviceData = {
            id: response.user_id,
            accessToken: response.access_token,
            username: response.user.username
        };

    var whiteListed = ['first_name', 'last_name'];

    var fields = _.pick(whiteListed);
    _.extend(serviceData, fields);



    return {
        serviceData: serviceData,
        options: {
            profile: {
                email: response.contact.email
                // picture: response.user.profile_picture,
                // username: response.user.username
            }
        }
    };
});

// returns an object containing:
// - accessToken
// - expiresIn: lifetime of token in seconds
var getTokenResponse = function (query) {
    var config = ServiceConfiguration.configurations.findOne({service: 'mailchimp'});
    if (!config)
        throw new ServiceConfiguration.ConfigError("Service not configured");

    var result = HTTP.post(
        "https://login.mailchimp.com/oauth2/token", {params: {
            code: query.code,
            client_id: config.clientId,
            client_secret: config.secret,
            redirect_uri: Meteor.absoluteUrl("_oauth/mailchimp?close=close"),
            grant_type: 'authorization_code'
        }});

    if (result.error) // if the http response was an error
        throw result.error;
    if (typeof result.content === "string")
        result.content = JSON.parse(result.content);
    if (result.content.error) // if the http response was a json object with an error attribute
        throw result.content;
    return result.content;
};

Mailchimp.retrieveCredential = function(credentialToken) {
  return Oauth.retrieveCredential(credentialToken);
};
