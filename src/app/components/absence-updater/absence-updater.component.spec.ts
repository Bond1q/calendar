import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceUpdaterComponent } from './absence-updater.component';

describe('AbsenceUpdaterComponent', () => {
  let component: AbsenceUpdaterComponent;
  let fixture: ComponentFixture<AbsenceUpdaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenceUpdaterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsenceUpdaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
