import LogicSelector from "./LogicSelector";
import FilterSelectorItem from "./filterSelectorItem";
import { AdvFilterTree } from "./types";

interface AdvFilterSelectorProps {
  data: AdvFilterTree[];
  depth: number;
  onAddChild: () => void;
  onAdd: () => void;
}
function AdvFilterSelector(props: AdvFilterSelectorProps) {
  const { onAdd, onAddChild } = props;
  return (
    <div className="adv-filter-selector">
      <LogicSelector />
      <div className="adv-filter-selector--list">
        {
          props.data.map((v, idx) => {
            console.log(v, v.id, 'dd')
            if (v.children?.length) {
              return (
                <AdvFilterSelector 
                  onAdd={onAdd} onAddChild={onAddChild}
                  key={v.id} data={v.children}
                  depth={props.depth + 1}
                />
              )
            }
            return (
              <FilterSelectorItem
                key={v.label.id}
                checkedFilterCondition={[]}
                defaultFirstValue={v.label.path}
                idx={idx}
                onAdd={() => {
                  console.log(props.depth)
                  onAdd();
                }}
                onRemove={() => { }}
                onFirstOptChange={() => { }}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default AdvFilterSelector;

