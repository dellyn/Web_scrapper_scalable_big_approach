export interface IClassesObject {
    [key: string]: boolean;
}

export interface IArgs {
    parts: any[],
    baseClass: string,
}

type StringOrRecord = string | Record<string, boolean>;

export type Arguments = Array<StringOrRecord>;
