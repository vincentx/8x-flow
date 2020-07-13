import context from "../src/context";

describe("Parsing Context", () => {
    test("should not create duplicated object", () => {
        let ctx = context();

        ctx.model({id: 'Order', 'archetype': 'contract'});
        ctx.model({id: 'Order', 'archetype': 'contract'});

        expect(ctx.result.models.length).toBe(1);
    });

    test("should merge attributes with same id", () => {
        let ctx = context();

        ctx.model({id: 'Order', 'archetype': 'contract'});
        ctx.model({id: 'Order', attributes: [{"name": "created_at", "type": "timestamp"}]});

        expect(ctx.result.models[0].attributes).toContainEqual({"name": "created_at", "type": "timestamp"});
    });

    test("should merge desc with same id", () => {
        let ctx = context();

        ctx.model({id: 'Order', 'archetype': 'contract'});
        ctx.model({id: 'Order', desc: 'desc', 'archetype': 'contract'});

        expect(ctx.result.models[0].desc).toBe('desc');
    });

    test("should not merge desc ''", () => {
        let ctx = context();

        ctx.model({id: 'Order', desc: 'desc', 'archetype': 'contract'});
        ctx.model({id: 'Order', 'archetype': 'contract'});

        expect(ctx.result.models[0].desc).toBe('desc');
    });

    test("should merge general role with specific one", () => {
        let ctx = context();

        ctx.model({id: 'Buyer', desc: 'desc', 'archetype': 'role'});
        ctx.model({id: 'Buyer', desc: 'desc', 'archetype': 'domain'});

        expect(ctx.result.models[0].archetype).toBe('domain');
    });


    test.each([["system", "role"],
        ["domain", "role"],
        ["contract", "evidence"],
        ["agreement", "evidence"],
        ["proposal", "evidence"],
        ["rfp", "evidence"],
        ["fulfillment", "evidence"],
        ["variform", "evidence"],
        ["details", "evidence"],
        ["contract", "participant"],
        ["agreement", "participant"],
        ["proposal", "participant"],
        ["rfp", "participant"],
        ["fulfillment", "participant"],
        ["variform", "participant"],
        ["evidence", "participant"],
        ["details", "participant"],
        ["system", "participant"],
        ["domain", "participant"],
        ["role", "participant"],
        ["variform", "role"],
        ["party", "participant"],
        ["place", "participant"],
        ["thing", "participant"]])("should use specific %s over %s", (specific, general) => {
        let ctx = context();

        ctx.model({id: 'Buyer', desc: 'desc', 'archetype': general});
        ctx.model({id: 'Buyer', desc: 'desc', 'archetype': specific});

        expect(ctx.result.models[0].archetype).toBe(specific);
    })

    test("should not merge specific role with general one", () => {
        let ctx = context();

        ctx.model({id: 'Buyer', desc: 'desc', 'archetype': 'domain'});
        ctx.model({id: 'Buyer', desc: 'desc', 'archetype': 'role'});

        expect(ctx.result.models[0].archetype).toBe('domain');
    });

    test("should merge same archetype", () => {
        let ctx = context();

        ctx.model({id: 'Buyer', desc: 'desc', 'archetype': 'details'});
        ctx.model({id: 'Buyer', desc: 'desc', 'archetype': 'details'});

        expect(ctx.result.models[0].archetype).toBe('details');
    });


    test("should not redefined with incompatible archetype", () => {
        let ctx = context();

        ctx.model({id: 'Buyer', desc: 'desc', 'archetype': 'domain'});
        expect(() => ctx.model({id: 'Buyer', desc: 'desc', 'archetype': 'contract'}))
            .toThrow("Buyer can not be redefined as 'contract'");
    });
});
