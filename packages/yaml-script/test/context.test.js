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

    test("should not merge specific role with general one", () => {
        let ctx = context();

        ctx.model({id: 'Buyer', desc: 'desc', 'archetype': 'domain'});
        ctx.model({id: 'Buyer', desc: 'desc', 'archetype': 'role'});

        expect(ctx.result.models[0].archetype).toBe('domain');
    });

    test("should not redefined with incompatible archetype", () => {
        let ctx = context();

        ctx.model({id: 'Buyer', desc: 'desc', 'archetype': 'domain'});
        expect(() => ctx.model({id: 'Buyer', desc: 'desc', 'archetype': 'contract'}))
            .toThrow("Buyer can not be redefined as 'contract'");
    });
});
