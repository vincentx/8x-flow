import * as d3 from "d3-selection";
import model from "../src/model";
import config from "../src/config";
import {attrs, dom} from "./utils";

describe("Model rendering", () => {

    describe("Render single model", () => {
        let document = dom();

        beforeAll(() =>
            model(d3.select(document.body), [{
                id: "Order",
                archetype: "contract",
                attributes: [{"name": "created_at", "type": "timestamp"}, {"name": "total_price", "type": "data"}]
            }]));

        test("should render all contents", () => {
            let content = document.querySelectorAll(".contract > .d3plus-textBox > text");

            expect(content.length).toBe(3);
            expect(content[0].innerHTML).toBe('&lt; contract &gt;');
            expect(content[1].innerHTML).toBe('Order');
            expect(content[2].innerHTML).toBe('created_at total_price');
        });

        test("should render background", () => {
            let background = document.querySelectorAll(".contract > .background");

            expect(background.length).toBe(1);
            attrs(background[0], {x: 0, y: 0, rx: 10, ry: 10, width: 400, height: 300, fill: "rgb(229, 59, 112)"});
        });

        test("should align to middle", () => {
            let texts = document.querySelectorAll(".contract > .d3plus-textBox > text");

            for (let i = 0; i < texts.length; i++)
                attrs(texts[i], {"text-anchor": "middle"});
        });

        test("should layout vertically properly", () => {
            let boxes = document.querySelectorAll(".contract > .d3plus-textBox");

            expect(boxes.length).toBe(3);
            positions(boxes).reduce((acc, cur) => {
                expect(cur[0]).toBe(acc[0]);
                expect(cur[1]).toBeGreaterThan(acc[1]);
                return cur;
            }, [0, 0]);
        });
    });

    let mi = "rgb(229, 59, 112)";
    let role = "rgb(254, 180, 63)";
    let participant = "rgb(103, 157, 52)";

    test.each([
        ['contract', mi],
        ['fulfillment', mi],
        ['rfp', mi],
        ['proposal', mi],
        ['agreement', mi],
        ['variform', mi],
        ['evidence', mi],
        ['participant', participant],
        ['party', participant],
        ['place', participant],
        ['thing', participant],
        ['domain', role],
        ['system', role],
        ['role', role],
    ])('Background color for archetype %s', function (archetype, color) {
        let document = dom();
        model(d3.select(document.body), [{
            id: "Order",
            archetype: archetype,
            attributes: [{"name": "created_at", "type": "timestamp"}]
        }]);

        let background = document.querySelector(`.${archetype} > .background`);

        attrs(background, {fill: color});

    });

    describe("Render single model with config", () => {
        let document = dom();

        beforeAll(() =>
            model(d3.select(document.body), [{
                id: "Order",
                archetype: "contract",
                attributes: [{"name": "created_at", "type": "timestamp"}, {"name": "total_price", "type": "data"}]
            }], config({
                models: {
                    defaults: {
                        shape: {
                            width: 480,
                            height: 360,
                            corner_radius: 15
                        },
                        archetype: {
                            color: 'red'
                        },
                        name: {
                            color: 'green'
                        },
                        attributes: {
                            color: 'blue'
                        }
                    }
                }

            })));

        test("should change shape and corner radius", () => {
            let background = document.querySelectorAll(".contract > .background");

            expect(background.length).toBe(1);
            attrs(background[0], {x: 0, y: 0, rx: 15, ry: 15, width: 480, height: 360});
        });

        test("text box should has same width and height of background", () => {
            let texts = document.querySelectorAll(".contract > .d3plus-textBox > text");
            expect(texts.length).toBe(3);

            attrs(texts[0], {fill: "red"});
            attrs(texts[1], {fill: "green"});
            attrs(texts[2], {fill: "blue"});
        });
    });
});

function positions(elements) {
    let result = [];
    for (let i = 0; i < elements.length; i++) {
        let transform = elements[i].attributes.getNamedItem("transform").value;
        let groups = transform.match(/translate\(([0-9]+),\s+([0-9]+)\)/);
        result.push([parseFloat(groups[1]), parseFloat(groups[2])]);
    }
    return result;
}

