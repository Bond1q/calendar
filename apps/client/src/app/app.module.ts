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
import { reducers } from './store/index';
import { AbsenceCreatorComponent } from './components/absence-creator/absence-creator.component';
import { HeaderComponent } from './components/header/header.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { EffectsModule } from '@ngrx/effects';
import { AbsenceEffect } from './store/effects/absence.effects';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FirstLetterCapitalizePipe } from './pipes/first-letter-capitalize.pipe';

@NgModule({
	declarations: [
		AppComponent,
		CalendarComponent,
		AbsenceUpdaterComponent,
		AbsencesComponent,
		DayCountPipe,
		TruncatePipe,
		FirstLetterCapitalizePipe,
		AbsenceCreatorComponent,
		HeaderComponent,
	],
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
		HttpClientModule,
		MatProgressSpinnerModule,
		StoreModule.forRoot(reducers),
		EffectsModule.forRoot([AbsenceEffect]),
		StoreDevtoolsModule.instrument({ maxAge: 25 })
	],
	providers: [],
	bootstrap: [AppComponent],

})
export class AppModule { }
