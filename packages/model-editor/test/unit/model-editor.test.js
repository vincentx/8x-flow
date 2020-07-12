import {shallowMount} from "@vue/test-utils";
import ModelEditor from "../../src/model-editor";
import ModelViewer from "../../src/components/model-viewer";
import ScriptEditor from '../../src/components/script-editor';

describe("ModelEditor", () => {
    test("should init editor and viewer with empty data", () => {
        let component = shallowMount(ModelEditor, {});

        let viewer = component.findComponent(ModelViewer);
        let editor = component.findComponent(ScriptEditor);

        expect(viewer.props("graph")).toStrictEqual({
            models: [],
            relationships: []
        });

        expect(editor.props("yaml")).toBe(undefined);
    });

    test("should not update graph based on yaml if not refresh", () => {
        let component = shallowMount(ModelEditor, {});
        component.setData({
            yaml: "role: Buyer"
        });

        expect(component.vm.graph.models.length).toBe(0);
        expect(component.vm.graph.relationships.length).toBe(0);
    });

    test("should update graph based on yaml if refresh", () => {
        let component = shallowMount(ModelEditor, {});
        component.setData({
            yaml: "role: Buyer"
        });

        component.vm.refresh();

        expect(component.vm.graph.models.length).toBe(1);
        expect(component.vm.graph.relationships.length).toBe(0);
    })
});