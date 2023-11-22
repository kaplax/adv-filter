export interface AdvFilterTree {
  label: FilterTreeData;
  value?: string | number | boolean;
  children?: AdvFilterTree[];
  id: string;
}

export interface FilterTreeData {
  label: React.ReactNode;
  value: string;
  children?:  FilterTreeData[];
  hidden?: boolean;
  incloudOpts?: { label: React.ReactNode; value: string }[];
  path: string;
  id: string;
}

export type ConditionMapToList = {
  [key: string]: {
    list: {path: string; value: string}[];
    checkedList: string[];
    order: number;
  }
}
