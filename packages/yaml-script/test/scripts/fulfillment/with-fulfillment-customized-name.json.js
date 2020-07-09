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
                "id": "Buyer Payment Request",
                "desc": "",
                "archetype": "fulfillment",
                "attributes": []
            },
            {
                "id": "Order Payment",
                "desc": "",
                "archetype": "fulfillment",
                "attributes": []
            }
        ],
        "relationships": [
            {
                "source": "Order",
                "target": "Buyer Payment Request",
                "type": "fulfillment"
            },
            {
                "source": "Buyer Payment Request",
                "target": "Order Payment",
                "type": "confirmation"
            }
        ]
    }
}
