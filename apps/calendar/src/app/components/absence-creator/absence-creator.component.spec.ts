import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceCreatorComponent } from './absence-creator.component';

describe('AbsenceCreatorComponent', () => {
  let component: AbsenceCreatorComponent;
  let fixture: ComponentFixture<AbsenceCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbsenceCreatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AbsenceCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
