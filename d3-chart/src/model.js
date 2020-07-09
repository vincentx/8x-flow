import * as d3 from "d3-selection";
import * as d3plus from "d3plus-text";

export default function (chart, models, config) {
    return chart
        .selectAll("g")
        .data(models)
        .join("g").each(render)
        .attr("class", _ => `model ${_.archetype}`);
}

const momentInterval = "rgb(229, 59, 112)";
const role = "rgb(254, 180, 63)";
const participant = "rgb(103, 157, 52)";

const fills = [
    [['rfp', 'proposal', 'contract', 'agreement', 'fulfillment', 'evidence', 'variform'], momentInterval],
    [['party', 'place', 'thing', 'participant'], participant],
    [['domain', 'system', 'role'], role]
];

function render(model) {
    renderBackground(this, model);
    renderTextBoxes(this, model);
}

function renderTextBoxes(container, model) {
    new d3plus.TextBox()
        .data(texts(model))
        .height(100)
        .width(400)
        .verticalAlign('middle')
        .textAnchor('middle')
        .fontResize(d => d.resize)
        .fontColor('white')
        .fontSize(d => d.font.size)
        .fontFamily(d => d.font.family)
        .y((d, i) => i * 100)
        .select(container)
        .render();
}

function texts(model) {
    return [
        {
            text: ['<', model.archetype, '>'].join(' '), resize: false,
            font: {family: '"Helvetica", sans-serif', size: 25}
        },
        {
            text: model.id, resize: true,
            font: {family: '"Helvetica", sans-serif', weight: 'bold', size: 40}
        },
        {
            text: model.attributes.map(_ => _.name).join(' '), resize: false,
            font: {family: '"Helvetica", sans-serif', size: 25}
        }
    ];
}

function renderBackground(container, model) {
    let color = fills.find((f) => f[0].includes(model.archetype))[1];

    d3.select(container)
        .append('rect')
        .attr('class', 'background')
        .attr('width', 400)
        .attr('height', 300)
        .attr('x', 0)
        .attr('y', 0)
        .attr('rx', 10)
        .attr('ry', 10)
        .attr('fill', color);
}