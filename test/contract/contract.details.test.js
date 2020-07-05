import {describe, expect, test} from "@jest/globals";

import {parse} from "../../src/main";
import {yml} from '../utils'

describe('Contract Details Declaration', () => {

    test('should define details as separated model', () => {
        let result = parse(yml('contract/details/with-details'));

        let models = result.models;
        let relationships = result.relationships;

        expect(models.length).toBe(2);
        expect(relationships.length).toBe(1);

        let order_item = result.models[1];
        expect(order_item.id).toBe('Order Item');
        expect(order_item.archetype).toBe('contract-details');
        expect(order_item.attributes.length).toBe(0);

        let order_order_item = relationships[0];
        expect(order_order_item.source).toBe('Order');
        expect(order_order_item.target).toBe('Order Item');
        expect(order_order_item.type).toBe('details');
    });

    test('should accept comma separated details', () => {
        let result = parse(yml('contract/details/with-comma-separated-details'));
        let models = result.models;
        let relationships = result.relationships;

        expect(models.length).toBe(3);
        expect(relationships.length).toBe(2);

        let item = result.models[1];
        expect(item.id).toBe('Item');
        expect(item.attributes.length).toBe(0);

        let recipe = result.models[2];
        expect(recipe.id).toBe('Recipe');
        expect(recipe.attributes.length).toBe(0);

        let manufacture_order_item = relationships[0];
        expect(manufacture_order_item.source).toBe('Manufacture Order');
        expect(manufacture_order_item.target).toBe('Item');
        expect(manufacture_order_item.type).toBe('details');

        let manufacture_order_recipe = relationships[1];
        expect(manufacture_order_recipe.source).toBe('Manufacture Order');
        expect(manufacture_order_recipe.target).toBe('Recipe');
        expect(manufacture_order_recipe.type).toBe('details');

    });

    test('should define details with key_data', () => {
        let result = parse(yml('contract/details/with-key-data'));

        let models = result.models;
        let relationships = result.relationships;

        expect(models.length).toBe(2);
        expect(relationships.length).toBe(1);

        let order_item = result.models[1];
        expect(order_item.id).toBe('Order Item');
        expect(order_item.archetype).toBe('contract-details');
        expect(order_item.attributes.length).toBe(1);
        expect(order_item.attributes[0].name).toBe('amount');
        expect(order_item.attributes[0].type).toBe('data');

        let order_order_item = relationships[0];
        expect(order_order_item.source).toBe('Order');
        expect(order_order_item.target).toBe('Order Item');
        expect(order_order_item.type).toBe('details');
    });

    test('should define details with map', () => {
        let result = parse(yml('contract/details/with-map-details'));

        let models = result.models;
        let relationships = result.relationships;

        expect(models.length).toBe(2);
        expect(relationships.length).toBe(1);

        let order_item = result.models[1];
        expect(order_item.id).toBe('Order Item');
        expect(order_item.archetype).toBe('contract-details');
        expect(order_item.attributes.length).toBe(1);
        expect(order_item.attributes[0].name).toBe('amount');
        expect(order_item.attributes[0].type).toBe('data');

        let order_order_item = relationships[0];
        expect(order_order_item.source).toBe('Order');
        expect(order_order_item.target).toBe('Order Item');
        expect(order_order_item.type).toBe('details');
    });

    test('should define details with key_timestamps', () => {
        let result = parse(yml('contract/details/with-key-timestamps'));

        let models = result.models;
        let relationships = result.relationships;

        expect(models.length).toBe(2);
        expect(relationships.length).toBe(1);

        let order_item = result.models[1];
        expect(order_item.id).toBe('Order Item');
        expect(order_item.attributes.length).toBe(1);
        expect(order_item.attributes[0].name).toBe('add_to_cart_at');
        expect(order_item.attributes[0].type).toBe('timestamp');

        let order_order_item = relationships[0];
        expect(order_order_item.source).toBe('Order');
        expect(order_order_item.target).toBe('Order Item');
        expect(order_order_item.type).toBe('details');
    });

    test('should throw exception if detail with malformed data', () => {
        expect(() => parse(yml('contract/details/with-malformed')))
            .toThrow('Order details has malformed declaration');
    });

    test('should define details with desc', () => {
        let result = parse(yml('contract/details/with-desc'));

        let models = result.models;
        let relationships = result.relationships;

        expect(models.length).toBe(2);
        expect(relationships.length).toBe(1);

        let order_item = result.models[1];
        expect(order_item.desc).toBe('Order Items');
    });
});
