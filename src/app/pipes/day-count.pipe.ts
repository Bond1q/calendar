import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'daycount' })
export class DayCountPipe implements PipeTransform {
	transform(value: number): string {
		let str = value === 1 ? value + ' day' : value + ' days';
		return str;
	}
}
