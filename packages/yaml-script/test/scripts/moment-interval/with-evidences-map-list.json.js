export const json = function (type) {
    return {
        "models": [
            {
                "id": "Service Fee",
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
                "id": "Clearance Form",
                "archetype": "evidence",
                "desc": "",
                "attributes": []
            }
        ],
        "relationships": [
            {
                "source": "Service Fee",
                "target": "Clearance Form",
                "type": "as-evidence"
            }
        ]
    }
}
