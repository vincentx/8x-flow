import {attrs, attr, dom} from "./utils";
import * as d3 from "d3-selection";
import {render} from "../src/main";

describe("Chart rendering", () => {
    let document = dom();
    let data = {
        models: [
            {
                id: "Order",
                archetype: "contract",
                attributes: []
            },
            {
                id: "Item",
                archetype: "details",
                attributes: []
            }
        ],
        relationships: [
            {
                source: "Order",
                target: "Items",
                type: "has-details"
            }
        ]
    };
    let presenter = {};

    beforeAll(() => {
        render(d3.select(document.body), {
            data: data,
            view: function (p) {
                presenter = p
            }
        })
    });

    test("should pass svg to view", () => {
        expect(presenter.svg._groups[0][0].tagName).toBe("svg");
    });

    test("should pass nodes to view", () => {
        expect(presenter.nodes._groups[0].length).toBe(2);
    });

    test("should pass links to view", () => {
        expect(presenter.links._groups[0].length).toBe(1);
    });

    test("should pass options to view", () => {
        expect(presenter.options.models).toBeTruthy();
    });

    test("should tick function to view", () => {
        data.relationships[0].source = {
            x: 1, y: 2
        };
        data.relationships[0].target = {
            x: 3, y: 4
        };
        presenter.tick();

        attrs(document.querySelectorAll("svg > g > g > line")[0], {x1: 1, y1: 2, x2: 3, y2: 4});
    });
});
