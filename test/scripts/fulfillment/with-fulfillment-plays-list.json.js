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
                "desc": "",
                "archetype": "fulfillment",
                "attributes": []
            },
            {
                "id": "Order Payment Confirmation",
                "desc": "",
                "archetype": "fulfillment",
                "attributes": []
            },
            {
                "id": "Doc",
                "desc": "",
                "archetype": "role",
                "attributes": []
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
            },
            {
                "source": "Order Payment Confirmation",
                "target": "Doc",
                "type": "plays"
            }
        ]
    }
}
