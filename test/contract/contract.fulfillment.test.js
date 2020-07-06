import {describe, expect, test} from "@jest/globals";

import {parse} from "../../src/main";
import {yml} from '../utils'

describe('Contract Fulfillment Declaration', () => {
    test('should define fulfillment with request and confirmation', () => {
        let result = parse(yml('contract/fulfillment/with-fulfillment'));

        expect(result.models.length).toBe(3);

        let order_payment_request = result.models[1];
        expect(order_payment_request.id).toBe('Order Payment Request');
        expect(order_payment_request.archetype).toBe('fulfillment');

        let order_payment_confirmation = result.models[2];
        expect(order_payment_confirmation.id).toBe('Order Payment Confirmation');
        expect(order_payment_confirmation.archetype).toBe('fulfillment');

        expect(result.relationships.length).toBe(2);

        let order_order_payment_request = result.relationships[0];
        expect(order_order_payment_request.source).toBe('Order');
        expect(order_order_payment_request.target).toBe('Order Payment Request');
        expect(order_order_payment_request.type).toBe('fulfillment');

        let request_confirmation = result.relationships[1];

        expect(request_confirmation.source).toBe('Order Payment Request');
        expect(request_confirmation.target).toBe('Order Payment Confirmation');
        expect(request_confirmation.type).toBe('confirmation');
    });

    test('should accept comma separated fulfilment', () => {
        let result = parse(yml('contract/fulfillment/with-comma-separated-fulfillment'));

        expect(result.models.length).toBe(5);

        let order_payment_request = result.models[1];
        expect(order_payment_request.id).toBe('Order Payment Request');
        expect(order_payment_request.archetype).toBe('fulfillment');

        let order_payment_confirmation = result.models[2];
        expect(order_payment_confirmation.id).toBe('Order Payment Confirmation');
        expect(order_payment_confirmation.archetype).toBe('fulfillment');

        let shipping_request = result.models[3];
        expect(shipping_request.id).toBe('Shipping Request');
        expect(shipping_request.archetype).toBe('fulfillment');

        let shipping_confirmation = result.models[4];
        expect(shipping_confirmation.id).toBe('Shipping Confirmation');
        expect(shipping_confirmation.archetype).toBe('fulfillment');
    });

    test('should define fulfillment with map', () => {
        let result = parse(yml('contract/fulfillment/with-map-fulfillment'));

        expect(result.models.length).toBe(3);

        let order_payment_request = result.models[1];
        expect(order_payment_request.id).toBe('Order Payment Request');
        expect(order_payment_request.archetype).toBe('fulfillment');

        let order_payment_confirmation = result.models[2];
        expect(order_payment_confirmation.id).toBe('Order Payment Confirmation');
        expect(order_payment_confirmation.archetype).toBe('fulfillment');

        expect(result.relationships.length).toBe(2);
    });

    test('should throw exception if fulfillment with malformed data',() => {
        expect(() => parse(yml('contract/fulfillment/with-malformed')))
            .toThrow('Order has malformed fulfillment declaration');
        expect(() => parse(yml('contract/fulfillment/with-malformed-map')))
            .toThrow('Order has malformed fulfillment declaration');
        expect(() => parse(yml('contract/fulfillment/with-malformed-map-list')))
            .toThrow('Order has malformed fulfillment declaration');
        expect(() => parse(yml('contract/fulfillment/with-malformed-map-num')))
            .toThrow('Order has malformed fulfillment declaration');
    });

    test('should append fulfillment desc to request', () => {
        let result = parse(yml('contract/fulfillment/with-fulfillment-desc'));

        expect(result.models.length).toBe(3);
        let order_payment_request = result.models[1];
        expect(order_payment_request.id).toBe('Order Payment Request');
        expect(order_payment_request.desc).toBe('Order Payment');
        expect(order_payment_request.archetype).toBe('fulfillment');

        let order_payment_confirmation = result.models[2];
        expect(order_payment_confirmation.id).toBe('Order Payment Confirmation');
        expect(order_payment_confirmation.archetype).toBe('fulfillment');
        expect(order_payment_confirmation.desc).toBe('');
    });

    test('should add key data to require and confirm', () => {
        let result = parse(yml('contract/fulfillment/with-key-data'));

        expect(result.models.length).toBe(3);
        let order_payment_request = result.models[1];
        expect(order_payment_request.id).toBe('Order Payment Request');
        expect(order_payment_request.attributes.length).toBe(1);
        expect(order_payment_request.attributes[0].name).toBe('seller_account');
        expect(order_payment_request.attributes[0].type).toBe('data');

        let order_payment_confirmation = result.models[2];
        expect(order_payment_confirmation.id).toBe('Order Payment Confirmation');
        expect(order_payment_confirmation.attributes.length).toBe(1);
        expect(order_payment_confirmation.attributes[0].name).toBe('buyer_account');
        expect(order_payment_confirmation.attributes[0].type).toBe('data');
    });

    test('should use specified name instead of default name', () => {
        let result = parse(yml('contract/fulfillment/with-customize-name'));

        expect(result.models.length).toBe(3);
        let order_payment_request = result.models[1];
        expect(order_payment_request.id).toBe('Buyer Payment Request');

        let order_payment_confirmation = result.models[2];
        expect(order_payment_confirmation.id).toBe('Order Payment');
    });

    test('should add key timestamps to require and confirm', () => {
        let result = parse(yml('contract/fulfillment/with-key-timestamps'));

        expect(result.models.length).toBe(3);
        let order_payment_request = result.models[1];
        expect(order_payment_request.id).toBe('Order Payment Request');
        expect(order_payment_request.attributes.length).toBe(2);
        expect(order_payment_request.attributes[0].name).toBe('started_at');
        expect(order_payment_request.attributes[0].type).toBe('timestamp');
        expect(order_payment_request.attributes[1].name).toBe('expired_at');
        expect(order_payment_request.attributes[1].type).toBe('timestamp');

        let order_payment_confirmation = result.models[2];
        expect(order_payment_confirmation.id).toBe('Order Payment Confirmation');
        expect(order_payment_confirmation.attributes.length).toBe(1);
        expect(order_payment_confirmation.attributes[0].name).toBe('confirmed_at');
        expect(order_payment_confirmation.attributes[0].type).toBe('timestamp');
    });

    test('should mark confirmation as role', () => {
        let result = parse(yml('contract/fulfillment/with-role'));

        expect(result.models.length).toBe(3);
        let order_payment_confirmation = result.models[2];
        expect(order_payment_confirmation.archetype).toBe('variform');
    })
});