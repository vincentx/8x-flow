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
                "id": "Doc",
                "desc": "",
                "archetype": "role",
                "attributes": []
            }
        ],
        "relationships": [
            {
                "source": "Order",
                "target": "Doc",
                "type": "plays"
            }
        ]
    }
}
