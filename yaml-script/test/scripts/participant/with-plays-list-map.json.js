export const json = function (type) {
    return {
        "models": [
            {
                "id": "User",
                "desc": "",
                "archetype": type,
                "attributes": []
            },
            {
                "id": "Buyer",
                "desc": "",
                "archetype": "role",
                "attributes": []
            }
        ],
        "relationships": [
            {
                "source": "User",
                "target": "Buyer",
                "type": "plays"
            }
        ]
    }
}
