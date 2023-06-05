import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionModificationComponent } from './section-modification.component';

describe('SectionModificationComponent', () => {
  let component: SectionModificationComponent;
  let fixture: ComponentFixture<SectionModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionModificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
