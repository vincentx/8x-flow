import merge from "lodash-es/merge";

export default function (config) {
    return merge({
        shape: {
            width: 400,
            height: 300,
            corner_radius: 10
        },
        archetype: {
            color: 'white',
            family: '"Helvetica", sans-serif',
            size: 25
        },
        name: {
            color: 'white',
            family: '"Helvetica", sans-serif',
            size: 40,
        },
        attributes: {
            color: 'white',
            family: '"Helvetica", sans-serif',
            size: 25
        },
        relationships: {
            defaults: {
                color: "rgb(229, 59, 112)",
                width: 2,
                opacity: 0.8,
                dash: false
            },

            participant: {
                color: "rgb(254, 180, 63)",
                width: 1.5,
                opacity: 0.6,
                dash: false
            },
            plays: {
                color: "rgb(153, 153, 153)",
                width: 1,
                opacity: 0.6,
                dash: true
            },
            relates: {
                color: "rgb(103, 157, 52)",
                width: 1,
                opacity: 0.6,
                dash: true
            }
        }


    }, config || {});
}