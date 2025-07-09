import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodesTableComponent } from './episodes-table.component';

describe('EpisodesTableComponent', () => {
  let component: EpisodesTableComponent;
  let fixture: ComponentFixture<EpisodesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpisodesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
