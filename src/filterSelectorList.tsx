import { memo } from "react";
import FilterSelectorItem from "./filterSelectorItem";

import { type CheckboxValueType } from "antd/es/checkbox/Group";
import type { ConditionMapToList, FilterTreeData } from "./types";

interface FilterSelectorListProps {
  checkedFilterCondition: CheckboxValueType[][];
  onRemove: (data: { idx: number }) => void;
  onAdd: () => void;
  onFirstOptChange: (data: { idx: number; data: FilterTreeData }) => void;
  filterConditionMap: ConditionMapToList;
  filterConditionList: { path: string; value: string; id: string }[];
  // const filterConditionMap = useSignal<ConditionMapToList>({});
}
function FilterSelectorList(props: FilterSelectorListProps) {
  const { checkedFilterCondition, filterConditionList, filterConditionMap, onRemove, onAdd, onFirstOptChange } = props;
  // const filterConditionList = Object.keys(filterConditionMap).map(key => ({ ...filterConditionMap[key], id: key })).sort((a, b) => a.order - b.order);
  return (
    <div>
      {
        filterConditionList.map((item, idx) => {
          return (
            <FilterSelectorItem
              idx={idx}
              // parentKey={group.id}
              // idxs={[idx, i]}
              defaultFirstValue={item.path} key={item.id}
              checkedFilterCondition={checkedFilterCondition}
              onRemove={onRemove}
              onAdd={onAdd}
              onFirstOptChange={onFirstOptChange}
            />
          )

        })
      }
    </div>
  )
}

export default memo(FilterSelectorList);
