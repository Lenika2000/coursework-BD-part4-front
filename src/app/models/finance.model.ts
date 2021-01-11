export interface FinanceElem {
  type: FinanceElemType;
  sum: number;
  description: string;
  date: Date;
}

export type FinanceElemType = 'Доход' | 'Расход';
