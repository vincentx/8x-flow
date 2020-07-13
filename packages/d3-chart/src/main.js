import presenter from "./presenter";

export function render(container, opts) {
    let p = presenter(container, opts.data, opts.options);
    opts.view(p);
    return p;
}