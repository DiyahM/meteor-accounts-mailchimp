Package.describe({
  summary: "Login service for mailchimp accounts"
});

Package.on_use(function (api, where) {
  api.add_files('accounts-mailchimp.js', ['client', 'server']);
});

Package.on_test(function (api) {
  api.use('accounts-mailchimp');

  api.add_files('accounts-mailchimp_tests.js', ['client', 'server']);
});
