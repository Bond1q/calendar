import { AbsenceReducer, AbsenceTypes } from '../../types/types';
import * as moment from 'moment';
import { createReducer, on } from '@ngrx/store';
import { deleteAbsence, updateAbsence, createAbsence } from './absence.action';
import { v4 as uuid } from 'uuid';

const initialState: AbsenceReducer = {
	absencePeriods: [
		{
			type: AbsenceTypes.SICK,
			dateStart: moment([2022, 11, 1]).toDate(),
			dateEnd: moment([2022, 11, 3]).toDate(),
			comment: 'Was',
			id: uuid(),
		},
		{
			type: AbsenceTypes.SICK,
			dateStart: moment([2022, 11, 4]).toDate(),
			dateEnd: moment([2022, 11, 9]).toDate(),
			comment: 'I am ill',
			id: uuid(),
		},
		{
			type: AbsenceTypes.VACATION,
			dateStart: moment([2022, 11, 10]).toDate(),
			dateEnd: moment([2022, 11, 19]).toDate(),
			comment: 'Day for chill',
			id: uuid(),
		},
		{
			type: AbsenceTypes.SICK,
			dateStart: moment([2023, 1, 8]).toDate(),
			dateEnd: moment([2023, 1, 16]).toDate(),
			comment: 'I will be ill',
			id: uuid(),
		},
		{
			type: AbsenceTypes.VACATION,
			dateStart: moment([2023, 2, 10]).toDate(),
			dateEnd: moment([2023, 2, 20]).toDate(),
			comment: 'Going to the sea',
			id: uuid(),
		},
	],
};

export const absenceReducer = createReducer(
	initialState,
	on(deleteAbsence, (state, action) => {
		return {
			...state,
			absencePeriods: state.absencePeriods.filter(
				(absence) => absence.id !== action.id
			),
		};
	}),
	on(updateAbsence, (state, action) => {
		const newAbsenceList = state.absencePeriods.map((el) => {
			const newElem = { ...el };
			if (el.id == action.id) {
				newElem.dateStart = action.dateStart;
				newElem.dateEnd = new Date(action.dateEnd);
			}
			return newElem;
		});

		return { ...state, absencePeriods: newAbsenceList };
	}),
	on(createAbsence, (state, action) => {
		if (action.absence.comment.length > 0) {
			const id = uuid();
			const newAbsencePeriods = [...state.absencePeriods];
			newAbsencePeriods.push({ id, ...action.absence });
			return { ...state, absencePeriods: newAbsencePeriods };
		}
		return { ...state };
	})
);
