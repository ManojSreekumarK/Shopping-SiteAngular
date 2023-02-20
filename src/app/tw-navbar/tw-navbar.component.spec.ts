import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwNavbarComponent } from './tw-navbar.component';

describe('TwNavbarComponent', () => {
  let component: TwNavbarComponent;
  let fixture: ComponentFixture<TwNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
