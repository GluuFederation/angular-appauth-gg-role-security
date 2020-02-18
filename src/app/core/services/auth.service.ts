import {Injectable} from '@angular/core';
import {
  AuthorizationServiceConfigurationJson,
  AuthorizationServiceConfiguration,
  AuthorizationRequest,
  RedirectRequestHandler,
  FetchRequestor,
  LocalStorageBackend,
  DefaultCrypto,
  BaseTokenRequestHandler,
  AuthorizationNotifier,
  GRANT_TYPE_AUTHORIZATION_CODE,
  TokenRequest
} from '@openid/appauth';
import {NoHashQueryStringUtils} from '../no-hash-query-string-utils';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {distinctUntilChanged} from 'rxjs/operators';
import {ApiService} from './api.service';

@Injectable()
export class AuthService {
  private configuration: AuthorizationServiceConfigurationJson = null;
  error: any = null;
  private authorizationHandler: any = null;
  private tokenHandler: any = null;
  notifier: any = null;
  private request: any = null;
  private response: any = null;

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<any>({});
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
    this.authorizationHandler = new RedirectRequestHandler(
      new LocalStorageBackend(),
      new NoHashQueryStringUtils(),
      window.location,
      new DefaultCrypto());
    this.tokenHandler = new BaseTokenRequestHandler(new FetchRequestor());
    this.notifier = new AuthorizationNotifier();
    this.authorizationHandler.setAuthorizationNotifier(this.notifier);
    this.notifier.setAuthorizationListener((request, response, error) => {
      console.log('Authorization request complete ', request, response, error);
      if (response) {
        this.request = request;
        this.response = response;
        const code = response.code;
        console.log(`Authorization Code  ${response.code}`);

        let extras = null;
        if (this.request && this.request.internal) {
          extras = {};
          extras.code_verifier = this.request.internal.code_verifier;
        }

        const tokenRequest = new TokenRequest({
          client_id: environment.client_id,
          redirect_uri: environment.redirect_uri,
          grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
          code,
          refresh_token: undefined,
          extras
        });

        AuthorizationServiceConfiguration.fetchFromIssuer(environment.openid_connect_url, new FetchRequestor())
          .then((oResponse: any) => {
            this.configuration = oResponse;
            return this.tokenHandler.performTokenRequest(this.configuration, tokenRequest);
          })
          .then((oResponse) => {
            this.saveTokens(oResponse);
            this.isAuthenticatedSubject.next(true);
            // this.populate();
            this.router.navigate(['/']);
          })
          .catch(oError => {
            this.error = oError;
          });
      }
    });
  }

  redirect() {
    AuthorizationServiceConfiguration.fetchFromIssuer(environment.openid_connect_url, new FetchRequestor())
      .then((response: any) => {
        this.configuration = response;
        const authRequest = new AuthorizationRequest({
          client_id: environment.client_id,
          redirect_uri: environment.redirect_uri,
          scope: environment.scope,
          response_type: AuthorizationRequest.RESPONSE_TYPE_CODE,
          state: undefined,
          // extras: environment.extra
        });
        this.authorizationHandler.performAuthorizationRequest(this.configuration, authRequest);
      })
      .catch(error => {
        this.error = error;
      });
  }

  handleCodeAndAuthorization() {
    this.authorizationHandler.completeAuthorizationRequestIfPossible();
  }

  getToken(): string {
    return window.localStorage.accessToken;
  }

  saveTokens(tokens) {
    window.localStorage.accessToken = tokens.accessToken;
    window.localStorage.idToken = tokens.idToken;
  }

  destroyToken() {
    this.isAuthenticatedSubject.next(false);
    window.localStorage.removeItem('accessToken');
  }

  // Verify accessToken in localstorage with server & load ..
  // This runs once on application startup
  populate() {
    if (this.getToken()) {
      this.getUserInfo()
        .subscribe(
          (data) => this.setAuth(data),
          err => this.destroyToken()
        );
    } else {
      this.destroyToken();
    }
  }

  setAuth(userInfo) {
    this.currentUserSubject.next(userInfo);
    this.isAuthenticatedSubject.next(true);
  }

  getUserInfo(): Observable<any> {
    return this.apiService.get(environment.openid_connect_url + '/oxauth/restv1/userinfo');
  }

  logout() {
    const {openid_connect_url, end_session_endpoint , logout_redirect_uri} = environment;
    window.location.href = openid_connect_url + end_session_endpoint + '?' + 'post_logout_redirect_uri=' + logout_redirect_uri + '&id_token_hint=' + window.localStorage.idToken;
  }
}
