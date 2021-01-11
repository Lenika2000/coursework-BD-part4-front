export interface FinanceElem {
  type: FinanceElemType;
  sum: number;
  description: string;
  date: Date;
}

export interface FinanceFilter {
  startDate: Date;
  endDate: Date;
  isIncome: boolean;
  isExpenses: boolean;
}

export type FinanceElemType = 'Доход' | 'Расход';
