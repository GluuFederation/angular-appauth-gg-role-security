export const environment = {
  production: true,
  client_id: '9fc8f40d-9426-40c5-a446-5b163720aac5',
  redirect_uri: 'http://localhost:4200/login',
  logout_redirect_uri: 'http://localhost:4200',
  openid_connect_url: 'https://gluu.local.org',
  end_session_endpoint: '/oxauth/restv1/end_session', // you gluu server end_session_endpoint
  scope: 'openid email profile',
  extra: {prompt: 'consent', access_type: 'offline'},
  ggURL: 'https://gluu.local.org:9443',
  companyEndpoint: '/company'
};
