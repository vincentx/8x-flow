import {parse} from "../../src/components/script-editor.lint";

describe("Lint", () => {
    test("should report parsing error at cursor line", () => {
        let result = parse("contract: Order", {}, {
            getCursor: () => {
                return {line: 10};
            }
        });

        expect(result.length).toBe(1);
        expect(result[0].from.line).toBe(10);
        expect(result[0].from.ch).toBe(0);
        expect(result[0].to.line).toBe(10);
        expect(result[0].to.ch).toBe(0);
        expect(result[0].message).toBe("Order must have key_timestamps declaration");
    });

    test("should report parsing error at 0, if can't get cursor position", () => {
        let result = parse("contract: Order", {}, {
            getCursor: () => null
        });

        expect(result.length).toBe(1);
        expect(result[0].from.line).toBe(0);
        expect(result[0].from.ch).toBe(0);
        expect(result[0].to.line).toBe(0);
        expect(result[0].to.ch).toBe(0);
        expect(result[0].message).toBe("Order must have key_timestamps declaration");
    });

    test("should report parsing error for the whole file at 0 by default", () => {
        let result = parse("contract: Order");

        expect(result.length).toBe(1);
        expect(result[0].from.line).toBe(0);
        expect(result[0].from.ch).toBe(0);
        expect(result[0].to.line).toBe(0);
        expect(result[0].to.ch).toBe(0);
        expect(result[0].message).toBe("Order must have key_timestamps declaration");
    });

    test("should not report any error if script is ok", () => {
        let result = parse("role: Buyer");

        expect(result.length).toBe(0);
    });

});