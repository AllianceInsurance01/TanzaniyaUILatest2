import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalQuoteDetailsComponent } from './personal-quote-details.component';



describe('VehicleWishListComponent', () => {
  let component: PersonalQuoteDetailsComponent;
  let fixture: ComponentFixture<PersonalQuoteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalQuoteDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalQuoteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
