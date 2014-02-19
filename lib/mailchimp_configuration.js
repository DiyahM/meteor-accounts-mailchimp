Template.configureLoginServiceDialogForMailchimp.siteUrl = function () {
    return Meteor.absoluteUrl({replaceLocalhost: true});
};

Template.configureLoginServiceDialogForMailchimp.fields = function () {
    return [
        {property: 'clientId', label: 'client_id'},
        {property: 'secret', label: 'Client secret'}
    ];
};
