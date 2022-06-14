export interface MykiExportPaymentCard {
  nickname: string
  status: string
  tags: string
  cardNumber: string
  cardName: string
  exp_month: string
  exp_year: string
  cvv: string
  additionalInfo: string
}

export interface MykiExportPassword {
  additionalInfo: string
  nickname: string
  password: string
  status: string
  tags: string
  twofaSecret: string
  url: string
  username: string
}
