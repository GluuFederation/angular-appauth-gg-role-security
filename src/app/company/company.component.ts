import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../core/services';
import {Company} from '../core/models';

@Component({
  selector: 'app-company-page',
  templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {
  constructor(private companyService: CompanyService) {}
  companies: Company[];

  ngOnInit(): void {
    this.companyService.get()
      .subscribe((companies) => {
        this.companies = companies;
      });
  }

  delete(id) {
    this.companyService.delete(id).subscribe((company) => {
      alert('Company has been deleted successfully!');
      this.companies = this.companies.filter(c => c.id !== id);
    });
  }
}
