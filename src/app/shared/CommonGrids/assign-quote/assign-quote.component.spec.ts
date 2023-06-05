import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignQuoteComponent } from './Assign-quote.component';



describe('PendingCustomerComponent', () => {
  let component: AssignQuoteComponent;
  let fixture: ComponentFixture<AssignQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
