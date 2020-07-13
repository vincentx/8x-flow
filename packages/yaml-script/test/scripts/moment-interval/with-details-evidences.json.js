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
                "desc": "",
                "archetype": "details",
                "attributes": []
            },
            {
                "id": "Price Proposal",
                "desc": "price proposal",
                "archetype": "proposal",
                "attributes": [
                    {
                        "name": "created_at",
                        "type": "timestamp"
                    }
                ]
            }
        ],
        "relationships": [
            {
                "source": "Order",
                "target": "Order Item",
                "type": "has-details"
            },
            {
                "source": "Order Item",
                "target": "Price Proposal",
                "type": "as-evidence"
            }
        ]
    }
}
