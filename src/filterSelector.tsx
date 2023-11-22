import { useRef } from "react";
import { useSignal, useSignalEffect } from "@preact/signals-react";
import { Modal, Button, Checkbox } from "antd";
import FilterSelectorList from "./filterSelectorList";
import AdvFilterSelecotrTree from "./advFilterSelectorTree";
import { filterFieldConfig } from "./model/filterField";
import { createId, deepClone } from "./util";

import "./index.less";

import type { CheckboxValueType } from "antd/es/checkbox/Group";
import type { ConditionMapToList, FilterTreeData } from "./types";


interface FilterSelectorProps {
  filterFieldConfig: FilterTreeData[];
}
function FilterSelector(props: FilterSelectorProps) {
  const { filterFieldConfig: filterFieldConfigFromProps } = props;
  const checkedFilterCondition = useSignal<CheckboxValueType[][]>([]);
  const filterConditionMap = useSignal<ConditionMapToList>({});
  const checkedFilterConditionMap = useSignal<ConditionMapToList>({});
  const filterConditionList = useSignal<{ path: string; value: string, id: string }[]>([]);
  const filterConditionListRef = useRef<{ path: string; value: string, id: string }[]>([]);
  const filterFieldConfigKeys = useRef<{ path: string; value: string }[]>([]);

  const openFilterConditionModal = useSignal(false);

  const addFilterCondition = () => {
    openFilterConditionModal.value = true;
  }

  const closeFilterConditionModal = () => {
    openFilterConditionModal.value = false
  };

  const confirmAddFilterCondition = () => {
    filterConditionList.value = filterConditionListRef.current;
    closeFilterConditionModal();
  }

  const removeCheckedFilterCondition = (params: { idx: number }) => {
    const { idx } = params;
    const target = filterConditionList.value[idx];
    const filteredList = filterConditionList.value.filter((_v, i) => i !== idx);
    filterConditionList.value = filteredList;
    filterConditionListRef.current = filteredList.slice();


    if (filteredList.some(v => v.value === target.value)) {
      return;
    }

    const cpCheckedFilterConditionMap = deepClone(checkedFilterConditionMap.value);
    const paths = target.path.split('-');
    cpCheckedFilterConditionMap[paths[0]].checkedList = cpCheckedFilterConditionMap[paths[0]].checkedList.filter(v => v !== paths[1]);
    checkedFilterConditionMap.value = cpCheckedFilterConditionMap;
  }

  const handleCheckedFilterConditionChange = (params: { idx: number; data: FilterTreeData }) => {
    const { idx, data } = params;
    const target = filterConditionList.value[idx];
    const changedFilterConditionList = filterConditionList.value
      .map((v, i) => i === idx ? { path: data.path, value: data.value, id: createId() } : v);
    filterConditionList.value = changedFilterConditionList;
    filterConditionListRef.current = changedFilterConditionList.slice();
    if (changedFilterConditionList.some(v => v.value === target.value)) {
      return;
    }

    const cpCheckedFilterConditionMap = deepClone(checkedFilterConditionMap.value);
    const paths = target.path.split('-');
    cpCheckedFilterConditionMap[paths[0]].checkedList = cpCheckedFilterConditionMap[paths[0]].checkedList.filter(v => v !== paths[1]);
    checkedFilterConditionMap.value = cpCheckedFilterConditionMap;
  }

  const addCheckedFilterCondition = () => {
    // filterFieldConfig
    const checkedList = Object.keys(checkedFilterConditionMap.value)
      .map(key => checkedFilterConditionMap.value[key].checkedList)
      .flat(1);
    filterFieldConfigKeys.current.some((data) => {
      if (!checkedList.find(v => data.value === v)) {
        const addedList = [...filterConditionList.value, { ...data, id: createId() }];
        filterConditionList.value = addedList;
        filterConditionListRef.current = addedList;
        const cpCheckedFilterConditionMap = deepClone(checkedFilterConditionMap.value);
        const paths = data.path.split('-');
        if (cpCheckedFilterConditionMap[paths[0]]) {
          cpCheckedFilterConditionMap[paths[0]].checkedList = [...cpCheckedFilterConditionMap[paths[0]].checkedList, data.value];
        } else {
          cpCheckedFilterConditionMap[paths[0]] = {
            checkedList: [data.value],
            list: [],
            order: 0,
          }
        }
        checkedFilterConditionMap.value = cpCheckedFilterConditionMap;
        return true;
      }
      return false;
    })
    console.log(checkedList, "aa")
  }

  useSignalEffect(() => {
    filterFieldConfig.value = filterFieldConfigFromProps;
    filterFieldConfigKeys.current = filterFieldConfigFromProps.map(v => v.children).flat(1).map(v => ({ path: v!.path, value: v!.value }));
  })

  return (
    <div>
      <AdvFilterSelecotrTree />
      <FilterSelectorList
        filterConditionList={filterConditionList.value}
        filterConditionMap={filterConditionMap.value}
        checkedFilterCondition={checkedFilterCondition.value}
        onRemove={removeCheckedFilterCondition}
        onAdd={addCheckedFilterCondition}
        onFirstOptChange={handleCheckedFilterConditionChange}
      />
      <Button onClick={addFilterCondition}>+</Button>
      <Modal
        open={openFilterConditionModal.value}
        onOk={confirmAddFilterCondition}
        onCancel={closeFilterConditionModal}
      >
        {
          filterFieldConfig.value.map((conf, idx) => {
            return (
              <div key={conf.value}>
                <h3>{conf.label}</h3>
                <div>
                  <Checkbox.Group
                    value={checkedFilterConditionMap.value[conf.value]?.checkedList || []}
                    options={conf.children}
                    onChange={(checkedValue) => {
                      const list = checkedValue.map(v => ({ path: `${conf.value}-${v}`, value: v as string, id: createId() }));
                      const cpCheckedValMap = deepClone(checkedFilterConditionMap.value);
                      if (cpCheckedValMap[conf.value]) {
                        cpCheckedValMap[conf.value].list = list.slice();
                        cpCheckedValMap[conf.value].checkedList = checkedValue as string[];
                      } else {
                        cpCheckedValMap[conf.value] = {
                          list, order: idx, checkedList: checkedValue as string[],
                        }
                      }
                      checkedFilterConditionMap.value = cpCheckedValMap
                      list.forEach(item => {
                        if (!filterConditionListRef.current.find(v => v.value === item.value)) {
                          // TODO: 反选异常
                          filterConditionListRef.current = [...filterConditionListRef.current, item];
                        }
                      });
                    }}
                  />
                </div>
              </div>
            )
          })
        }
      </Modal>
    </div>
  )
}

export default FilterSelector;
