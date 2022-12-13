import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AbsenceTypes, AbsencePeriod } from '../../types/types';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { createAbsence } from '../../store/absence-reducer/absence.action';
import { dateRangeValidator } from '../../shared/date-range-validator';
import { Subject, takeUntil } from 'rxjs';
import { absencesSelector } from '../../store/selectors/absence.selector';

@Component({
  selector: 'app-absence-creator',
  templateUrl: './absence-creator.component.html',
  styleUrls: ['./absence-creator.component.scss'],
})
export class AbsenceCreatorComponent implements OnInit, OnDestroy {
  buttonDisabled = true;
  absenceList: AbsencePeriod[] = [];
  absenceForm = this.formBuilder.group(
    {
      absenceType: ['', [Validators.required]],
      dateStart: ['', [Validators.required]],
      dateEnd: ['', [Validators.required]],
      comment: ['', [Validators.required, Validators.maxLength(100)]],
    },
    {
      validators: [
        dateRangeValidator('dateStart', 'dateEnd', this.absenceList),
        this.absenceTypeValidator('dateStart', 'absenceType'),
      ],
    }
  );

  absenceTypesValues = Object.keys(AbsenceTypes);
  componentDestroyed$: Subject<boolean> = new Subject();
  constructor(
    public dialogRef: MatDialogRef<AbsenceCreatorComponent>,
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.store
      .select(absencesSelector)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((absences) => {
        this.absenceList = absences;
        this.absenceForm.addValidators(
          dateRangeValidator('dateStart', 'dateEnd', this.absenceList)
        );
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onRequest(): void {
    const newAbsence = {
      type: AbsenceTypes[
        this.absenceForm.controls.absenceType.value as keyof typeof AbsenceTypes
      ],
      dateStart: new Date(this.absenceForm.controls.dateStart.value!),
      dateEnd: new Date(this.absenceForm.controls.dateEnd.value!),
      comment: this.absenceForm.controls.comment.value!,
    };
    this.store.dispatch(createAbsence({ absence: newAbsence }));
    this.dialogRef.close();
  }

  absenceTypeValidator(
    dateStartField: string,
    absenceTypeField: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dateStart = control.get(dateStartField)?.value;
      const absenceType = control.get(absenceTypeField)?.value;
      if (
        moment(dateStart).isBefore(moment(), 'day') &&
        absenceType.toLowerCase() !== AbsenceTypes.SICK.toLowerCase()
      ) {
        return { incorrectTypeForPast: true };
      }
      return null;
    };
  }
  ngOnInit(): void {
    this.absenceForm.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((value) => {
        this.buttonDisabled = !this.absenceForm.valid;
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
