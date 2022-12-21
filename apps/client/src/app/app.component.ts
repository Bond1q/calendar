import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadingSelector } from './store/selectors/absence.selector';
import { takeUntil, Subject } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
	componentDestroyed$: Subject<boolean> = new Subject();
	isLoading = false;
	constructor(private store: Store) {
		this.store
			.select(loadingSelector)
			.pipe(takeUntil(this.componentDestroyed$))
			.subscribe((loading) => {
				this.isLoading = loading;
			});
	}

	ngOnDestroy(): void {
		this.componentDestroyed$.next(true);
		this.componentDestroyed$.complete();
	}
}
