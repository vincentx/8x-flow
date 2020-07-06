import context from "../src/context";

describe("Parsing Context", () => {
   test("should not create duplicated model", () => {
       let ctx = context();

       ctx.model({id: 'Order'});
       ctx.model({id: 'Order'});

       expect(ctx.result.models.length).toBe(1);
   });
});
