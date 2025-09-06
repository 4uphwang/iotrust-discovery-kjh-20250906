
export type MultiLangString = {
    [langCode: string]: string;
};

export type ListItem = {
    id: string;
    name: string;
    description?: MultiLangString;
    icon: string;
    link?: string;
    network?: string | string[];
    visibleFor?: string[];
    platform?: ('iOS' | 'Android' | 'Web')[];
    environment?: ('dev' | 'stage' | 'prod')[];
};