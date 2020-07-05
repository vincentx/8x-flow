import {parse} from "../src/main";
import fs from 'fs'

describe('Contract Declaration', () => {
    describe('Basic', () => {
        test('should with key timestamp', () => {
            let script = yml('contract/basic/with-key-timestamp');
            let result = parse(script).models;

            expect(result.length).toBe(1);

            let order = result[0];
            expect(order.id).toBe('Order');
            expect(order.attributes.length).toBe(1);

            let created_at = order.attributes[0];
            expect(created_at.name).toBe('created_at');
            expect(created_at.type).toBe('timestamp');
        });

        test('should accept comma separated timestamps', () => {
            let script = yml('contract/basic/comma-separated');
            let result = parse(script).models;

            expect(result.length).toBe(1);

            let model = result[0];

            let created_at = model.attributes[0];
            expect(created_at.name).toBe('created_at');
            expect(created_at.type).toBe('timestamp');

            let expired_at = model.attributes[1];
            expect(expired_at.name).toBe('expired_at');
            expect(expired_at.type).toBe('timestamp');
        });

        test('should throw exception if no timestamp defined for contract', () => {
            let script = yml('contract/basic/no-timestamps');
            expect(() => parse(script)).toThrow('Contract Order must have timestamps');
        });
    });

});

function yml(name) {
    return fs.readFileSync(`${process.cwd()}/test/scripts/${name}.yml`).toString();
}