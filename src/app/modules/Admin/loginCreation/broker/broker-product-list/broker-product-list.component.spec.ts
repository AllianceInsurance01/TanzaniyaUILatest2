import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerProductListComponent } from './broker-product-list.component';

describe('BrokerProductListComponent', () => {
  let component: BrokerProductListComponent;
  let fixture: ComponentFixture<BrokerProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerProductListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
