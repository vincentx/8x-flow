export const json = function (type) {
    return {
        "models":
            [{
                "id": "User",
                "desc": "Registered User",
                "archetype": type,
                "attributes": [
                    {
                        "name": "user_id",
                        "type": "data"
                    }
                ]
            }],
        "relationships": []
    }
}
