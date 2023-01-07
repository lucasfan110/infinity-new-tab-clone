export type BasicIcon = {
    type: "basic";
    bgColor: string;
    bgText: string;
    bgTextSize: number;
};

export type ImgIcon = {
    type: "img";
    url: string;
};

export type Icon = BasicIcon | ImgIcon;

export type SearchEngine = {
    id: string;
    name: string;
    icon: Icon;
    searchUrl: { [key: string]: string } | string;
};
