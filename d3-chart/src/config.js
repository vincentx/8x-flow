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
        }
    }, config || {});
}