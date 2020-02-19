import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../core/services';
import {Company} from '../core/models';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-company-page',
  templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {
  companies: Company[];
  companyForm: FormGroup;
  isSubmitting = false;
  company: Company = {} as Company;

  constructor(private companyService: CompanyService, private fb: FormBuilder) {
    this.companyForm = this.fb.group({
      title: '',
      body: ''
    });
  }

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

  submitForm() {
    this.isSubmitting = true;
    Object.assign(this.company, this.companyForm.value);
    this.companyService.save(this.company)
      .subscribe((company) => {
        this.companyForm = this.fb.group({
          title: '',
          body: ''
        });
      }, (error) => {
        this.companyForm = this.fb.group({
          title: '',
          body: ''
        });
      });
  }

  edit(company) {
    this.company = company;
    this.companyForm = this.fb.group({
      title: company.title,
      body: company.body
    });
  }
}
