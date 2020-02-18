// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  client_id: 'b4361065-79ac-48c9-8cc6-0cda5e6cf631',
  redirect_uri: 'http://localhost:4200/login',
  logout_redirect_uri: 'http://localhost:4200',
  openid_connect_url: 'https://gluu.local.org',
  end_session_endpoint: '/oxauth/restv1/end_session', // you gluu server end_session_endpoint
  scope: 'openid email profile',
  extra: {prompt: 'consent', access_type: 'offline'},
  ggURL: 'https://gluu.local.org:9443',
  companyEndpoint: '/company'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
