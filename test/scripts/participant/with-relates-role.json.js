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
                "id": "Account",
                "desc": "",
                "archetype": "role",
                "attributes": []
            }
        ],
        "relationships": [
            {
                "source": "User",
                "target": "Account",
                "type": "relates"
            }
        ]
    }
}
