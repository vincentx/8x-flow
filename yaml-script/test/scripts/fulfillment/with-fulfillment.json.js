export const json = function (type) {
    return {
        "models": [
            {
                "id": "Order",
                "desc": "",
                "archetype": type,
                "attributes": [
                    {
                        "name": "created_at",
                        "type": "timestamp"
                    }
                ]
            },
            {
                "id": "Order Payment Request",
                "desc": "Order Payment",
                "archetype": "fulfillment",
                "attributes": [
                    {
                        "name": "started_at",
                        "type": "timestamp"
                    },
                    {
                        "name": "expired_at",
                        "type": "timestamp"
                    },
                    {
                        "name": "seller_account",
                        "type": "data"
                    }
                ]
            },
            {
                "id": "Order Payment Confirmation",
                "desc": "",
                "archetype": "fulfillment",
                "attributes": [
                    {
                        "name": "confirmed_at",
                        "type": "timestamp"
                    },
                    {
                        "name": "buyer_account",
                        "type": "data"
                    }
                ]
            }
        ],
        "relationships": [
            {
                "source": "Order",
                "target": "Order Payment Request",
                "type": "fulfillment"
            },
            {
                "source": "Order Payment Request",
                "target": "Order Payment Confirmation",
                "type": "confirmation"
            }
        ]
    }
}
