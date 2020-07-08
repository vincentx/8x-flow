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
                "id": "Order Item",
                "desc": "Order items",
                "archetype": "details",
                "attributes": [
                    {
                        "name": "add_to_cart_at",
                        "type": "timestamp"
                    },
                    {
                        "name": "amount",
                        "type": "data"
                    }
                ]
            }
        ],
        "relationships": [
            {
                "source": "Order",
                "target": "Order Item",
                "type": "has-details"
            }
        ]
    }
}