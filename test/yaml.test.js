import yaml from "../src/yaml";

describe("YAML Structures", () => {
    describe('role', () => {
        test("should accept name starts with _ as role", () => {
            expect(yaml.role.is("_Shop")).toBeTruthy();
            expect(yaml.role.name("_Shop")).toBe("Shop");
        });
    });
});
