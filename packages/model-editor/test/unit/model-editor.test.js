import {mount, shallowMount} from "@vue/test-utils";
import ModelEditor from "../../src/model-editor";
import ModelViewer from "../../src/components/model-viewer";
import ScriptEditor from '../../src/components/script-editor';

jest.mock("file-saver", () => ({saveAs: jest.fn()}));

import {saveAs} from "file-saver";

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

    test("should update graph based on yaml", () => {
        let component = shallowMount(ModelEditor, {});
        component.setData({
            yaml: "role: Buyer"
        });

        expect(component.vm.graph.models.length).toBe(1);
        expect(component.vm.graph.relationships.length).toBe(0);
    });

    test("download yaml", () => {
        let yaml = "role: Buyer";
        let component = shallowMount(ModelEditor, {});
        component.setData({
            yaml: yaml
        });

        component.vm.downloadScript();
        expect(saveAs).toHaveBeenCalledWith(new Blob([yaml], {type: "text/plain;charset=utf-8"}), "models.yaml");
    });

    test("download svg", () => {
        let component = mount(ModelEditor, {
            stubs: ['script-editor']
        });
        let svg = component.vm.$refs.viewer.$el.querySelector("svg").outerHTML;

        component.vm.downloadGraph();
        expect(saveAs).toHaveBeenCalledWith(new Blob([svg], {type: "image/svg+xml;charset=utf-8"}), "models.svg");
    });
});