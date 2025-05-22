import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUserLoginComponent } from './select-user-login.component';

describe('SelectUserLoginComponent', () => {
  let component: SelectUserLoginComponent;
  let fixture: ComponentFixture<SelectUserLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectUserLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectUserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
