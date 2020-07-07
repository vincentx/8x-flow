import {parse} from "../../src/main";
import {yml} from '../utils'

describe('Contract Declaration', () => {
    test('should be defined with key timestamp', () => {
        let result = parse(yml('contract/basic/with-key-timestamps')).models;

        expect(result.length).toBe(1);

        let order = result[0];
        expect(order.id).toBe('Order');
        expect(order.archetype).toBe('contract');
        expect(order.attributes.length).toBe(1);

        let created_at = order.attributes[0];
        expect(created_at.name).toBe('created_at');
        expect(created_at.type).toBe('timestamp');
    });

    test('should accept comma separated timestamps', () => {
        let result = parse(yml('contract/basic/with-comma-separated-timestamps')).models;

        expect(result.length).toBe(1);

        let model = result[0];

        let created_at = model.attributes[0];
        expect(created_at.name).toBe('created_at');
        expect(created_at.type).toBe('timestamp');

        let expired_at = model.attributes[1];
        expect(expired_at.name).toBe('expired_at');
        expect(expired_at.type).toBe('timestamp');
    });

    test('should throw exception if malformed timestamp defined for contract', () => {
        expect(() => parse(yml('contract/basic/malformed-timestamps'))).toThrow('Order has malformed key_timestamps declaration');
    });

    test('should throw exception if no timestamp defined for contract', () => {
        expect(() => parse(yml('contract/basic/no-timestamps'))).toThrow('Order must have key_timestamps declaration');
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

    test('should be defined with description', () => {
        let result = parse(yml('contract/basic/with-desc')).models;

        expect(result.length).toBe(1);

        let order = result[0];
        expect(order.id).toBe('Order');
        expect(order.archetype).toBe('contract');
        expect(order.desc).toBe('Purchard Order Contract');
        expect(order.attributes.length).toBe(1);

    });
});
