import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePayementComponent } from './make-payement.component';

describe('MakePayementComponent', () => {
  let component: MakePayementComponent;
  let fixture: ComponentFixture<MakePayementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakePayementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakePayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
