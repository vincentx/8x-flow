import {describe, expect, test} from "@jest/globals";

import {parse} from "../../src/main";
import {yml} from '../utils'

describe('Contract Declaration', () => {
    test('should be defined with key timestamp', () => {
        let result = parse(yml('contract/participants/with-participants'));

        expect(result.relationships.length).toBe(1);
        expect(result.relationships[0].source).toBe('Order');
        expect(result.relationships[0].target).toBe('Shop');
        expect(result.relationships[0].type).toBe('participant');
    });

});
