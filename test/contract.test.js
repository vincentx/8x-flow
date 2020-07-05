import {parse} from "../src/main";
import fs from 'fs'

describe('Contract Declaration', () => {
    describe('Basic', () => {
        test('should be defined with key timestamp', () => {
            let result = parse(yml('contract/basic/with-key-timestamp')).models;

            expect(result.length).toBe(1);

            let order = result[0];
            expect(order.id).toBe('Order');
            expect(order.attributes.length).toBe(1);

            let created_at = order.attributes[0];
            expect(created_at.name).toBe('created_at');
            expect(created_at.type).toBe('timestamp');
        });

        test('should accept comma separated timestamps', () => {
            let result = parse(yml('contract/basic/with-comma-separated-timestamp')).models;

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
            expect(() => parse(yml('contract/basic/no-timestamps'))).toThrow('Contract Order must have timestamps');
        });

        test('should be defined with key data', () => {
            let result = parse(yml('contract/basic/with-key-data')).models;

            expect(result.length).toBe(1);

            let order = result[0];
            expect(order.id).toBe('Order');
            expect(order.attributes.length).toBe(2);

            let total_price = order.attributes[1];
            expect(total_price.name).toBe('total_price');
            expect(total_price.type).toBe('data');
        });

        test('should accept comma separated key data', () => {
            let result = parse(yml('contract/basic/with-comma-separated-data')).models;

            expect(result.length).toBe(1);

            let order = result[0];
            expect(order.id).toBe('Order');
            expect(order.attributes.length).toBe(3);

            let total_price = order.attributes[1];
            expect(total_price.name).toBe('total_price');
            expect(total_price.type).toBe('data');

            let type = order.attributes[2];
            expect(type.name).toBe('type');
            expect(type.type).toBe('data');

        });
    });

});

function yml(name) {
    return fs.readFileSync(`${process.cwd()}/test/scripts/${name}.yml`).toString();
}