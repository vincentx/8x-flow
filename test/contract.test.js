import {parse} from "../src/main";
import fs from 'fs'
import {describe, expect, test} from "@jest/globals";

describe('Contract Declaration', () => {
    describe('Basic', () => {
        test('should be defined with key timestamp', () => {
            let result = parse(yml('contract/basic/with-key-timestamps')).models;

            expect(result.length).toBe(1);

            let order = result[0];
            expect(order.id).toBe('Order');
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

    describe('Details', () => {
        test('should define details as separated model', () => {
            let result = parse(yml('contract/details/with-details'));

            let models = result.models;
            let relationships = result.relationships;

            expect(models.length).toBe(2);
            expect(relationships.length).toBe(1);

            let order_item = result.models[1];
            expect(order_item.id).toBe('Order Item');
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
                .toThrow('Order/Order Item has malformed declaration');
        });
    });
});

function yml(name) {
    return fs.readFileSync(`${process.cwd()}/test/scripts/${name}.yml`).toString();
}