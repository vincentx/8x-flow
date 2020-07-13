import template from "../../template";

export const yaml = template`
- ${'type'}: Order
  key_timestamps: created_at
  details:
    Order Item:
      evidences:
        Price Proposal: Price Proposal
        
- proposal: Price Proposal
  desc: price proposal
  key_timestamps: created_at
`