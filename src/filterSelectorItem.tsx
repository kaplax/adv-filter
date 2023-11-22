import { Select, Cascader } from "antd";
import { filterFieldConfig } from "./model/filterField";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { useSignal } from "@preact/signals-react";
import { FilterTreeData } from "./types";

interface FilterSelectorItemProps {
  checkedFilterCondition: CheckboxValueType[][];
  defaultFirstValue: string;
  idx: number;
  // parentKey: string;
  // idxs: number[];
  onRemove: (data: { idx: number }) => void;
  onAdd: () => void;
  // onFirstOptChange: (data: { key: string; idxs: number[]; data: FilterTreeData; }) => void;
  onFirstOptChange: (data: { idx: number; data: FilterTreeData; }) => void;
}

function FilterSelectorItem(props: FilterSelectorItemProps) {

  const findSecondOpts = (val: string): FilterTreeData | undefined => {
    let target: FilterTreeData | undefined = undefined;
    filterFieldConfig.value.some(v => {
      target = v.children?.find(cv => cv.value === val);
      return Boolean(target);
    });
    return target;
  }

  const defaultValuePath = String(props.defaultFirstValue).split("-") as string[];

  const currentOps = findSecondOpts(defaultValuePath[1])?.incloudOpts;
  const secondOpts = useSignal(currentOps);
  const secondOptVal = useSignal(currentOps?.[0]);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Cascader
        showSearch options={filterFieldConfig.value} defaultValue={defaultValuePath}
        displayRender={(label) => {
          return label[label.length - 1]
        }}
        onChange={(value) => {
          const opt = findSecondOpts(value[1] as string)
          secondOpts.value = opt?.incloudOpts;
          secondOptVal.value = secondOpts.value?.[0];
          if (!opt) return;
          props.onFirstOptChange({ idx: props.idx, data: opt });
        }}
      />
      <Select value={secondOptVal.value} options={secondOpts.value} onChange={(v) => {
        secondOptVal.value = v;
      }} />
      <div onClick={() => props.onRemove({ idx: props.idx })}>-</div>
      <div onClick={props.onAdd}>+</div>
    </div>
  )
}

export default FilterSelectorItem;
