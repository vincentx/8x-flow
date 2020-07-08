import template from "../../template";

export const yaml = template`
${'type'}: Order
key_timestamps: created_at
fulfillment:
  - Order Payment
`