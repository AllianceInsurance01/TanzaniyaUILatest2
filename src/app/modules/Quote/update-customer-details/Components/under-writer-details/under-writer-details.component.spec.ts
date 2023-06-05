import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderWriterDetailsComponent } from './under-writer-details.component';

describe('UnderWriterDetailsComponent', () => {
  let component: UnderWriterDetailsComponent;
  let fixture: ComponentFixture<UnderWriterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderWriterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderWriterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
