export const json = function (type) {
    return {
        "models": [
            {
                "id": "Manufacture Order",
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
                "id": "Item",
                "desc": "",
                "archetype": "details",
                "attributes": []
            },
            {
                "id": "Recipe",
                "desc": "",
                "archetype": "details",
                "attributes": []
            }
        ],
        "relationships": [
            {
                "source": "Manufacture Order",
                "target": "Item",
                "type": "has-details"
            },
            {
                "source": "Manufacture Order",
                "target": "Recipe",
                "type": "has-details"
            }
        ]
    }
}
