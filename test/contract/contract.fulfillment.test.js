import {parse} from "../../src/main";
import {yml} from '../utils'

describe('Contract Fulfillment Declaration', () => {

    test('should throw exception if fulfillment with malformed data', () => {
        expect(() => parse(yml('contract/fulfillment/with-malformed')))
            .toThrow('Order has malformed fulfillment declaration');
        expect(() => parse(yml('contract/fulfillment/with-malformed-map')))
            .toThrow('Order has malformed fulfillment declaration');
        expect(() => parse(yml('contract/fulfillment/with-malformed-map-list')))
            .toThrow('Order has malformed fulfillment declaration');
        expect(() => parse(yml('contract/fulfillment/with-malformed-map-num')))
            .toThrow('Order has malformed fulfillment declaration');
    });
    

    test('should mark confirmation as role', () => {
        for (let file of ['with-variform', 'with-variform-true']) {
            let result = parse(yml(`contract/fulfillment/${file}`));

            expect(result.models.length).toBe(3);
            let order_payment_confirmation = result.models[2];
            expect(order_payment_confirmation.archetype).toBe('variform');
        }
    });

    test('should mark confirmation as role', () => {
        let result = parse(yml('contract/fulfillment/with-variform-no'));

        expect(result.models.length).toBe(3);
        let order_payment_confirmation = result.models[2];
        expect(order_payment_confirmation.archetype).toBe('fulfillment');
    });
});