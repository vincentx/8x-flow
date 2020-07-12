import {shallowMount} from "@vue/test-utils";
import ModelViewer from "../../src/components/model-viewer";

describe("ModelViewer", () => {
    test("should render svg inside component", () => {
        let component = shallowMount(ModelViewer, {}).vm.$el;
        expect(component.querySelectorAll(".model-viewer > svg").length).toBe(1);
    });

    test("should render graph via bom", () => {
        let component = shallowMount(ModelViewer, {
            data: () => {
                return {
                    bom: {
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

    test("should render graph via graph ", () => {
        let component = shallowMount(ModelViewer, {
            propsData: {
                graph: {
                    models: [{id: "Order", archetype: "contract", attributes: []},
                        {id: "Order Item", archetype: "details", attributes: []}],
                    relationships: [{source: "Order", target: "Order Item", type: "has-details"}]
                }
            }
        }).vm.$el;
        expect(component.querySelectorAll(".model").length).toBe(2);
        expect(component.querySelectorAll("g > line").length).toBe(1);
    });

    test("should re-render graph if graph changes", () => {
        let component = shallowMount(ModelViewer, {
            propsData: {
                models: [{id: "Order", archetype: "contract", attributes: []}],
                relationships: []
            }
        });

        component.vm.$options.watch.graph.call(component.vm, {
            models: [{id: "Order", archetype: "contract", attributes: []},
                {id: "Order Item", archetype: "details", attributes: []}],
            relationships: [{source: "Order", target: "Order Item", type: "has-details"}]
        });

        expect(component.vm.$el.querySelectorAll(".model").length).toBe(2);
        expect(component.vm.$el.querySelectorAll("g > line").length).toBe(1);
    });

    test("should render graph for the first update", () => {
        let component = shallowMount(ModelViewer, {
            propsData: {
                models: [],
                relationships: []
            }
        });

        component.vm.$options.watch.graph.call(component.vm, {
            models: [{id: "Order", archetype: "contract", attributes: []},
                {id: "Order Item", archetype: "details", attributes: []}],
            relationships: [{source: "Order", target: "Order Item", type: "has-details"}]
        });

        expect(component.vm.$el.querySelectorAll(".model").length).toBe(2);
        expect(component.vm.$el.querySelectorAll("g > line").length).toBe(1);
    });
});