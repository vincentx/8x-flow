import template from "../../template";

export const yaml = template`
${'type'}: Order
key_timestamps: created_at
fulfillment:
  - Order Payment:
      desc: Order Payment
      request:
        key_data: seller_account
        key_timestamps: started_at, expired_at
      confirm:
        key_data: buyer_account
        key_timestamps: confirmed_at
`
