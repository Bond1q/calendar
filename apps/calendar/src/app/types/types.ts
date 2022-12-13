export enum AbsenceTypes {
  SICK = 'sick',
  VACATION = 'vacation',
}

export interface AbsencePeriod {
  type: AbsenceTypes;
  dateStart: Date;
  dateEnd: Date;
  comment: string;
  id: string;
}

export type AbsencePeriodInCalendar = {
  type: AbsencePeriod['type'];
  title: AbsencePeriod['comment'];
};

export interface DateInfo {
  date: Date;
  absenceList: AbsencePeriod[];
}

export interface AbsenceReducer {
  absencePeriods: AbsencePeriod[];
}
