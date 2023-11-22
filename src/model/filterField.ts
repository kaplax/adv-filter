import { signal } from "@preact/signals-react";
import { createId } from "../util";
import type { FilterTreeData } from "../types";
import type { CheckboxValueType } from "antd/es/checkbox/Group";

export const filterFieldConfig = signal<FilterTreeData[]>([]);

export const checkedFilterCondition = signal<CheckboxValueType[][]>([]);



const defaultIncludeOpts = [
  {
    label: "不包含",
    value: "uninclude",
  },
  {
    label: "包含",
    value: "include",
  },
  {
    label: "不为空",
    value: "notNULL",
  }
]

export const filterField = [
  {
    label: "基础字段",
    value: "basic",
    path: "basic",
    id: createId(),
    children: [
      {
        label: "类别",
        value: "kind",
        incloudOpts: defaultIncludeOpts,
        path: "basic-kind",
        id: createId(),
      },
      {
        label: "状态",
        value: "status",
        path: "basic-status",
        incloudOpts: defaultIncludeOpts.slice(1, 2),
        id: createId(),
      }
    ]
  },
  {
    label: "人员",
    value: "member",
    incloudOpts: defaultIncludeOpts,
    path: "member",
    id: createId(),
    children: [
      {
        label: "创建者",
        value: "creator",
        incloudOpts: defaultIncludeOpts,
        path: "member-creator",
        id: createId(),
      }
    ]
  }
]
