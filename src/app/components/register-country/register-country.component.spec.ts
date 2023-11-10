import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCountryComponent } from './register-country.component';

describe('RegisterCountryComponent', () => {
  let component: RegisterCountryComponent;
  let fixture: ComponentFixture<RegisterCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCountryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
