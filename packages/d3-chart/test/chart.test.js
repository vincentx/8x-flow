import {attrs, attr, dom} from "./utils";
import * as d3 from "d3-selection";
import * as x from "../src/main.js";

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
    let chart;

    beforeAll(() => {
        chart = x.chart(d3.select(document.body), data);

    });

    test("should render all models and relationships", () => {
        expect(document.querySelectorAll("svg > .contract").length).toBe(1);
        expect(document.querySelectorAll("svg > .details").length).toBe(1);
        expect(document.querySelectorAll("svg > g > line").length).toBe(1);
    });

    test("should change link position when tick", () => {
        data.relationships[0].source = {
            x: 1, y: 2
        };
        data.relationships[0].target = {
            x: 3, y: 4
        };
        chart.tick();

        attrs(document.querySelectorAll("svg > g > line")[0], {x1: 1, y1: 2, x2: 3, y2: 4});
    });

    test("should move model to center", () => {
        data.models[0].x = 500;
        data.models[0].y = 500;
        chart.tick();

        let transform = attr(document.querySelectorAll("svg > .contract")[0], "transform");

        let result = transform.match(/translate\(([0-9]+),\s+([0-9]+)\)/);
        expect(result[1]).toBe("460");
        expect(result[2]).toBe("470");
    });

    test("should scale model as defined in config", () => {
        data.models[0].x = 500;
        data.models[0].y = 500;
        chart.tick();

        let transform = attr(document.querySelectorAll("svg > .contract")[0], "transform");

        let result = transform.match(/scale\(([0-9\.]+),\s+([0-9\.]+)\)/);
        expect(result[1]).toBe("0.2");
        expect(result[2]).toBe("0.2");
    })
});
