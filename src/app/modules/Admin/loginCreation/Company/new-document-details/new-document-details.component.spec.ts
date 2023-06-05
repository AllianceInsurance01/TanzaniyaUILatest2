import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDocumentDetailsComponent } from './new-document-details.component';

describe('NewDocumentDetailsComponent', () => {
  let component: NewDocumentDetailsComponent;
  let fixture: ComponentFixture<NewDocumentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDocumentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDocumentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
