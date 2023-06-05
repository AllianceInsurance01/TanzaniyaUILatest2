import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinyurlDetailsComponent } from './tinyurl-details.component';

describe('TinyurlDetailsComponent', () => {
  let component: TinyurlDetailsComponent;
  let fixture: ComponentFixture<TinyurlDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinyurlDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TinyurlDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
