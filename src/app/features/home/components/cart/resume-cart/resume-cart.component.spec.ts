import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeCartComponent } from './resume-cart.component';

describe('ResumeCartComponent', () => {
  let component: ResumeCartComponent;
  let fixture: ComponentFixture<ResumeCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
