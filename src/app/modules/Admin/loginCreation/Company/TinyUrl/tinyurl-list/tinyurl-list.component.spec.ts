import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinyurlListComponent } from './tinyurl-list.component';

describe('TinyurlListComponent', () => {
  let component: TinyurlListComponent;
  let fixture: ComponentFixture<TinyurlListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinyurlListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TinyurlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
