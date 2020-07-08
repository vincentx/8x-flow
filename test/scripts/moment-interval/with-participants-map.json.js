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
                "id": "Shop",
                "desc": "",
                "archetype": "participant",
                "attributes": []
            }
        ],
        "relationships": [
            {
                "source": "Order",
                "target": "Shop",
                "type": "participant"
            }
        ]
    }
}
