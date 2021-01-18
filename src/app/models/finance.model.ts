export interface FinanceElem {
  id?: number;
  type: FinanceElemType;
  cost: number;
  item: string;
  date: Date;
}

export interface FinanceFilter {
  startDate: Date;
  endDate: Date;
  isIncome: boolean;
  isExpenses: boolean;
}

export type FinanceElemType = 'доход' | 'расход';
