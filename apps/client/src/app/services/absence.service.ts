import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Absence as AbsencePeriod } from 'shared/types';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AbsenceService {
	url = 'http://localhost:5000/absence';
	constructor(private http: HttpClient) { }

	getAllAbsences(): Observable<AbsencePeriod[]> {
		return this.http.get<AbsencePeriod[]>(this.url);
	}

	createAbsence(absence: Omit<AbsencePeriod, 'id'>) {
		return this.http.post<AbsencePeriod>(this.url, { ...absence }).pipe(
			catchError((error) => {
				console.error(error);
				return throwError(() => new Error(error));
			}),
		);
	}

	updateAbsence(id: string, absence: Pick<AbsencePeriod, 'dateStart' | 'dateEnd'>) {
		return this.http.put<AbsencePeriod>(this.url + `/${id}`, { ...absence }).pipe(
			catchError((error) => {
				console.error(error);
				return throwError(() => new Error(error));
			}),
		);
	}

	deleteAbsence(id: string) {
		return this.http.delete<AbsencePeriod>(this.url + `/${id}`).pipe(
			catchError((error) => {
				console.error(error);
				return throwError(() => new Error(error));
			}),
		);
	}
}
