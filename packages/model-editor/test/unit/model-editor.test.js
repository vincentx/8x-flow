import {mount, shallowMount} from "@vue/test-utils";
import ModelEditor from "../../src/model-editor";
import ModelViewer from "../../src/components/model-viewer";
import ScriptEditor from '../../src/components/script-editor';

jest.mock("file-saver", () => ({saveAs: jest.fn()}));

import {saveAs} from "file-saver";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("ModelEditor", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
        fetchMock.mockResponse(JSON.stringify([{name: "name", uri: "uri"}]));
    });

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

    test("should load example file from uri", async () => {
        fetchMock.mockResponse("role: Buyer");

        let component = shallowMount(ModelEditor);
        await component.vm.loadExample("uri");
        expect(component.vm.$data.yaml).toBe("role: Buyer");
    });

    test("should load example list from server", async () => {
        let component = await shallowMount(ModelEditor);
        let examples = await component.vm.examples;
        expect(examples.length).toBe(1);
        expect(examples[0].name).toBe("name");
        expect(examples[0].uri).toBe("uri");
    });
});