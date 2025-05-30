import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCartComponent } from './page-cart.component';

describe('PageCartComponent', () => {
  let component: PageCartComponent;
  let fixture: ComponentFixture<PageCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
