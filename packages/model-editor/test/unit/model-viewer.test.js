import {shallowMount} from "@vue/test-utils";
import ModelViewer from "../../src/components/model-viewer";

describe("ModelViewer", () => {
    test("should render svg inside component", () => {
        let component = shallowMount(ModelViewer, {}).vm.$el;
        expect(component.querySelectorAll(".model-viewer > svg").length).toBe(1);
    });

    test("should render graph", () => {
        let component = shallowMount(ModelViewer, {
            data: () => {
                return {
                    graph: {
                        models: [{id: "Order", archetype: "contract", attributes: []},
                            {id: "Order Item", archetype: "details", attributes: []}],
                        relationships: [{source: "Order", target: "Order Item", type: "has-details"}]
                    }
                }
            }
        }).vm.$el;
        expect(component.querySelectorAll(".model").length).toBe(2);
        expect(component.querySelectorAll("g > line").length).toBe(1);
    });
});