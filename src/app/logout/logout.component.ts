import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {
  code = '';
  error = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.logout();
  }
}
