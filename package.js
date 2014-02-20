Package.describe({
  summary: "Login service for mailchimp accounts"
});

Package.on_use(function(api) {
    api.use('accounts-base', ['client', 'server']);
    api.imply('accounts-base', ['client', 'server']);
    api.use('accounts-oauth', ['client', 'server']);

    api.use('oauth', ['client', 'server']);
    api.use('oauth2', ['client', 'server']);
    api.use('http', ['server']);
    api.use('underscore', 'server');
    api.use('templating', 'client');
    api.use('random', 'client');
    api.use('service-configuration', ['client', 'server']);
          
    api.add_files(
    ['lib/mailchimp_configuration.html', 'lib/mailchimp_configuration.js', 
    'lib/mailchimp_login_button.css'],
    'client');

    api.add_files("accounts_mailchimp.js");
    api.add_files('lib/mailchimp_common.js', ['client', 'server']);
    api.add_files('lib/mailchimp_client.js', 'client');
    api.add_files('lib/mailchimp_server.js', 'server');
});

