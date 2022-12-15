import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbsencePeriod } from '../types/types';
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
		return this.http.post<{ id: string }>(this.url, { ...absence }).pipe(
			catchError((error) => {
				console.error(error);
				return throwError(() => new Error(error));
			}),
		);
	}

	updateAbsence(id: string, absence: Pick<AbsencePeriod, 'dateStart' | 'dateEnd'>) {
		return this.http.put<{ id: string }>(this.url + `/${id}`, { ...absence }).pipe(
			catchError((error) => {
				console.error(error);
				return throwError(() => new Error(error));
			}),
		);
	}

	deleteAbsence(id: string) {
		return this.http.delete<{ id: string }>(this.url + `/${id}`).pipe(
			catchError((error) => {
				console.error(error);
				return throwError(() => new Error(error));
			}),
		);
	}
}
