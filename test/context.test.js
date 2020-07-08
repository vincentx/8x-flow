import context from "../src/context";

describe("Parsing Context", () => {
    test("should not create duplicated model", () => {
        let ctx = context();

        ctx.model({id: 'Order'});
        ctx.model({id: 'Order'});

        expect(ctx.result.models.length).toBe(1);
    });

    test("should merge attributes with same id", () => {
        let ctx = context();

        ctx.model({id: 'Order'});
        ctx.model({id: 'Order', attributes: [{"name": "created_at", "type": "timestamp"}]});

        expect(ctx.result.models[0].attributes).toContainEqual({"name": "created_at", "type": "timestamp"});
    });

    test("should merge desc with same id", () => {
        let ctx = context();

        ctx.model({id: 'Order'});
        ctx.model({id: 'Order', desc: 'desc'});

        expect(ctx.result.models[0].desc).toBe('desc');
    });

    test("should not merge desc ''", () => {
        let ctx = context();

        ctx.model({id: 'Order', desc: 'desc'});
        ctx.model({id: 'Order'});

        expect(ctx.result.models[0].desc).toBe('desc');
    });
});
