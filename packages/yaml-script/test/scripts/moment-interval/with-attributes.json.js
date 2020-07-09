export const json = function (type) {
    return {
        "models":
            [{
                "id": "Order",
                "desc": "Purchased Order Contract",
                "archetype": type,
                "attributes": [
                    {
                        "name": "created_at",
                        "type": "timestamp"
                    },
                    {
                        "name": "total_price",
                        "type": "data"
                    }
                ]
            }],
        "relationships": []
    }
}
