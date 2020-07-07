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
    
});