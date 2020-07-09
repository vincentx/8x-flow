import merge from "lodash-es/merge";

export default function (config) {
    return merge({
        models: {
            defaults: {
                shape: {
                    width: 400,
                    height: 300,
                    corner_radius: 10,
                    scale: 0.2
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
                fill: 'rgb(229, 59, 112)'
            },

            party: {
                fill: 'rgb(103, 157, 52)'
            },
            place: {
                fill: 'rgb(103, 157, 52)'
            },
            thing: {
                fill: 'rgb(103, 157, 52)'
            },
            participant: {
                fill: 'rgb(103, 157, 52)'
            },

            domain: {
                fill: 'rgb(254, 180, 63)'
            },
            system: {
                fill: 'rgb(254, 180, 63)'
            },
            role: {
                fill: 'rgb(254, 180, 63)'
            }
        },

        relationships: {
            defaults: {
                color: 'rgb(229, 59, 112)',
                width: 2,
                opacity: 0.8,
                dash: ""
            },

            participant: {
                color: 'rgb(254, 180, 63)',
                width: 1.5,
                opacity: 0.6,
            },
            plays: {
                color: 'rgb(153, 153, 153)',
                width: 1,
                opacity: 0.6,
                dash: "10,10"
            },
            relates: {
                color: 'rgb(103, 157, 52)',
                width: 1,
                opacity: 0.6,
            }
        },

        view: {
            width: 1000,
            height: 1000
        }
    }, config || {});
}