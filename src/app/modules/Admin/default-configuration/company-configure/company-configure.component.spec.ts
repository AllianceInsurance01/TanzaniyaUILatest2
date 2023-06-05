import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyConfigureComponent } from './company-configure.component';

describe('CompanyConfigureComponent', () => {
  let component: CompanyConfigureComponent;
  let fixture: ComponentFixture<CompanyConfigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyConfigureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
