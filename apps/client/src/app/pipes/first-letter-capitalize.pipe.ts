import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'firstLetterCapitalize'
})

export class FirstLetterCapitalizePipe implements PipeTransform {
	transform(value: string): string {
		return value[0].toUpperCase() + value.slice(1);
	}
}