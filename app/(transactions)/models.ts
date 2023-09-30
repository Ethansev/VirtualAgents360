export type RealEstateStages = {
  add_property_information: {
    name: 'Add Property Information';
    fields: {};
    status: TransactionStatus;
  };
  new_transaction_registration: 'New Transaction Registration';
  add_change: 'Add/Change';
  edm_document_upload: ' EDM Document Upload';
  instruction_to_pay_commission: 'Instruction To Pay Commission';
  commission_disbursement: 'Commission Disbursement';
};
export type MortgageStages = {};

export type TransactionStatus = 'Pending' | 'Approved' | 'Needs Attention';

export type Transaction = {
  mortgage: {
    stage: MortgageStages;
    status: TransactionStatus;
  };
  real_estate: {
    stage: RealEstateStages;
    status: TransactionStatus;
  };
};
