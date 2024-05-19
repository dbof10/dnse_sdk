

export interface LoanPackage {
  id: number;
  name: string;
  type: string;
  initialRate: number;
  initialRateForWithdraw: number;
  maintenanceRate: number;
  liquidRate: number;
  interestRate: number;
  preferentialPeriod: number;
  preferentialInterestRate: number;
  term: number;
  allowExtendLoanTerm: boolean;
  allowEarlyPayment: boolean;
  brokerFirmBuyingFeeRate: number;
  brokerFirmSellingFeeRate: number;
  transferFee: number;
  description: string;
  symbols: string[];
  basketId: number;
}
