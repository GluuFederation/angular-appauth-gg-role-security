import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Company} from '../models/company';
import {environment} from '../../../environments/environment';

@Injectable()
export class CompanyService {
  constructor(private apiService: ApiService) {}
  get(): Observable<Company[]> {
    return this.apiService.get(environment.ggURL + environment.companyEndpoint);
  }
}
