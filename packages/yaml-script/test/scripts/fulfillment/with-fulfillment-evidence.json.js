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
                "id": "Invoice",
                "archetype": "evidence"
            },
            {
                "id": "Receipt",
                "archetype": "evidence"
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
                "source": "Order Payment Request",
                "target": "Invoice",
                "type": "as-evidence"
            },
            {
                "source": "Order Payment Confirmation",
                "target": "Receipt",
                "type": "as-evidence"
            }
        ]
    }
}
