import template from "../../template";

export const yaml = template`
${'type'}: Order
key_timestamps: created_at
details:
  Order Item:
    participants:
      Shop: Shop who proivdes the products
`