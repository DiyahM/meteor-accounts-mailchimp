var Oauth = Package.oauth.Oauth;

var urlUtil = Npm.require('url');

Oauth.registerService('mailchimp', 2, null, function(query) {

    var response    = getTokenResponse(query);
    var accessToken = response.access_token;
    var metaData = getMetaData(accessToken);
    var accountData = getAccountData(accessToken, metaData);
                
    var serviceData = {
      id: accountData.user_id,
      accessToken: accessToken,
      username: accountData.username,
      accountName: metaData.accountname,
      role: metaData.role,
      apiEndpoint: metaData.api_endpoint
    };

    // var whiteListed = ['first_name', 'last_name'];

    // var fields = _.pick(whiteListed);
    // _.extend(serviceData, fields);
    


    return {
      serviceData: serviceData,
      options: {
        profile: {
          accountName: metaData.accountname,
          firstName: accountData.contact.fname,
          lastName: accountData.contact.lname,
          email: accountData.contact.email,
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
            redirect_uri: Meteor.absoluteUrl("_oauth/mailchimp?close", {replaceLocalhost:true}),
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

var getMetaData = function(accessToken) {
  var result = HTTP.get("https://login.mailchimp.com/oauth2/metadata",
                        {headers:
                          {"Authorization" : "OAuth "+accessToken}});
  if (result.error) // if the http response was an error
        throw result.error;
  if (typeof result.content === "string")
      result.content = JSON.parse(result.content);
  if (result.content.error) // if the http response was a json object with an error attribute
      throw result.content;
  return result.content;
}

var getAccountData = function(accessToken, metaData) {

  var result = HTTP.post(
        decodeURI(metaData.api_endpoint) + "/2.0/helper/account-details.json", {params: {
            "apikey": accessToken
        }});

  if (result.error) // if the http response was an error
      throw result.error;
  if (typeof result.content === "string")
      result.content = JSON.parse(result.content);
  if (result.content.error) // if the http response was a json object with an error attribute
      throw result.content;
  return result.content;
}

Mailchimp.retrieveCredential = function(credentialToken) {
  console.log("retrieveCredential");
  return Oauth.retrieveCredential(credentialToken);
};
