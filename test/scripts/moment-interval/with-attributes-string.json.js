import template from "../../template";

export const json = template`{
  "models": [
    {
      "id": "Order",
      "desc": "Purchased Order Contract",
      "archetype": "${'type'}",
      "attributes": [
        {
          "name": "created_at",
          "type": "timestamp"
        },
        {
          "name": "expired_at",
          "type": "timestamp"
        },
        {
          "name": "total_price",
          "type": "data"
        },
        {
          "name": "type",
          "type": "data"
        }
      ]
    }
  ],
  "relationships": []
}
`;