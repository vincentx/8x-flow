export const json = function (type) {
    return {
        "models": [
            {
                "id": "User",
                "desc": "",
                "archetype": type,
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
