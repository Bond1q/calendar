import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';
import { AbsenceUpdaterComponent } from './components/absence-updater/absence-updater.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { AbsencesComponent } from './components/absences/absences.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DayCountPipe } from './pipes/day-count.pipe';
import { StoreModule } from '@ngrx/store';
import { absenceReducer } from './store/absenceReducer/absence.reducer';
import { reducers } from './store/index';

@NgModule({
	declarations: [AppComponent, CalendarComponent, AbsenceUpdaterComponent, AbsencesComponent, DayCountPipe],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatIconModule,
		MatCheckboxModule,
		MatMenuModule,
		MatSelectModule,
		MatDialogModule,
		DialogModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatInputModule,
		MatDividerModule,
		MatExpansionModule,
		StoreModule.forRoot(reducers)

	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
