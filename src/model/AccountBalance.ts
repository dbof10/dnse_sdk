

export interface AccountBalance {
  investorId: string;
  custodyCode: string;
  investorAccountId: string;
  totalCash: number;
  availableCash: number;
  termDeposit: number;
  depositInterest: number;
  stockValue: number;
  marginableAmount: number;
  nonMarginableAmount: number;
  totalDebt: number;
  netAssetValue: number;
  receivingAmount: number;
  secureAmount: number;
  depositFeeAmount: number;
  maxLoanLimit: number;
  withdrawableCash: number;
  collateralValue: number;
  orderSecured: number;
  purchasingPower: number;
  cashDividendReceiving: number;
  marginDebt: number;
  marginRate: number;
  ppWithdraw: number;
  blockMoney: number;
  totalRemainDebt: number;
  totalUnrealizedDebt: number;
  id: string;
}
