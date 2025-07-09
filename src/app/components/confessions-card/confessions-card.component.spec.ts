import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfessionsCardComponent } from './confessions-card.component';

describe('ConfessionsCardComponent', () => {
  let component: ConfessionsCardComponent;
  let fixture: ComponentFixture<ConfessionsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfessionsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfessionsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
