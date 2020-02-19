import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from '../core/services';

@Directive({
  selector: '[appShowAuthed]'
})
export class ShowAuthedDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private authService: AuthService,
    private viewContainer: ViewContainerRef
  ) {
  }

  condition: boolean;

  ngOnInit() {
    this.authService.isAuthenticated.subscribe((isAuthenticated) => {
      if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }

  @Input() set appShowAuthed(condition: boolean) {
    this.condition = condition;
  }
}
