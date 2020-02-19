import {Component, OnInit} from '@angular/core';
import {AuthService} from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-appauth-oidc-auth-role-security';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.populate();
  }
}
