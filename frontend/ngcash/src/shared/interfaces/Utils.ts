export interface IUrl {
    protocol: string;
    host: string;
    pathname: string;
    origin: string;

    /** Ex: '**maps**.google.com', '**massage**.facebook.com', '**gvcentres**.gvdasa.com', '**compras**.amazon.com'... */
    subdomain: string;
    /** Ex: 'maps.**google**.com', 'massage.**facebook**.com', 'gvcentres.**gvdasa**.com', 'compras.**amazon**.com'... */
    domain: string;
    /** Ex: 'maps.google.**com**', 'massage.facebook.**com**', 'gvcentres.gvdasa.**com**', 'compras.amazon.**com**'... */
    maximalDomain: string;
}

export enum AlertTypes {
    warning="warning",
    success="success",
    loading="loading",
    error="error",
    info="info",
}