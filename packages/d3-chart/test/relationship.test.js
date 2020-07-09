import * as d3 from "d3-selection";
import relationship from "../src/relationship";
import {attrs, dom} from "./utils";
import config from "../src/config";

describe("Relationship rendering", () => {

    const momentIntervalRel = "rgb(229, 59, 112)";
    const participant = "rgb(254, 180, 63)";
    const plays = "rgb(153, 153, 153)";
    const relates = "rgb(103, 157, 52)";

    test.each([
        ["has-details", momentIntervalRel, 0.8, 2],
        ["fulfillment", momentIntervalRel, 0.8, 2],
        ["confirmation", momentIntervalRel, 0.8, 2],
        ["as-evidence", momentIntervalRel, 0.8, 2],
        ["participant", participant, 0.6, 1.5],
        ["plays", plays, 0.6, 1],
        ["relates", relates, 0.6, 1]
    ])("Render %s relationship", (t, color, opacity, width) => {
        let document = dom();
        relationship(d3.select(document.body), [{
            source: 'Order',
            target: 'Items',
            type: t
        }], config());

        let rel = document.querySelectorAll("g > line");

        expect(rel.length).toBe(1);
        attrs(rel[0], {"stroke-width": width, "stroke": color, "stroke-opacity": opacity});
    });

    test("Plays should be render with dash", () => {
        let document = dom();

        relationship(d3.select(document.body), [{
            source: 'Order',
            target: 'Items',
            type: 'plays'
        }], config());

        let rel = document.querySelectorAll("g > line");

        expect(rel.length).toBe(1);
        attrs(rel[0], {"stroke-dasharray": "10,10"});
    });

    test("Render single model with config", () => {
        let document = dom();

        relationship(d3.select(document.body), [{
            source: 'Order',
            target: 'Items',
            type: 'confirmation'
        }], config({
            relationships: {
                defaults: {
                    width: 15,
                    opacity: 0.1
                }
            }
        }));

        let rel = document.querySelectorAll("g > line");

        expect(rel.length).toBe(1);
        attrs(rel[0], {"stroke-width": 15, "stroke-opacity": 0.1});
    });
});
