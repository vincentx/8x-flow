import template from "../../template";

export const yaml = template`
${'type'}: Order
desc: Purchased Order Contract
key_data:
  - total_price
key_timestamps:
  - created_at
`;
