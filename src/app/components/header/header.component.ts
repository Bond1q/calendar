import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AbsenceCreatorComponent } from '../absence-creator/absence-creator.component';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	constructor(public dialog: MatDialog) { }
	openDialog(): void {
		const dialogRef = this.dialog.open(AbsenceCreatorComponent, {
			width: '500px',
		});

	}

}
