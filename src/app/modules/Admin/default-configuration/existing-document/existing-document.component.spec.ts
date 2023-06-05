import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingDocumentComponent } from './existing-document.component';

describe('ExistingDocumentComponent', () => {
  let component: ExistingDocumentComponent;
  let fixture: ComponentFixture<ExistingDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
