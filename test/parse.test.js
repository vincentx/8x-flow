import {parse} from "../src/main";

describe('Parse 8X flow script', () => {

    describe('Result structure', () => {
        test('should return models in array', () => {
            let results = parse('');
            expect(Array.isArray(results.models)).toBe(true);
        });

        test('should return relationships in array', () => {
            let results = parse('');
            expect(Array.isArray(results.relationships)).toBe(true);
        });
    });
});