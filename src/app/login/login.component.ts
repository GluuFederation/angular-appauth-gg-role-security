import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  code = '';
  error = '';

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.code = this.route.snapshot.queryParams.code;

    if (this.code) {
      this.authService.handleCodeAndAuthorization();
      return;
    }

    this.authService.redirect();
  }
}
