import AdvFilterSelector from "./advFilterSelector";
import { filterField } from "./model/filterField";
import { AdvFilterTree } from "./types";
import { createId } from "./util";



const data: AdvFilterTree[] = [
  {
    label: filterField[0],
    value: "1",
    id: createId(),
    children: [
      { value: "1-1", label: filterField[0], id: createId(), },
      { value: "1-2", label: filterField[0], id: createId(), },
    ]
  },
  {
    value: "2",
    label: filterField[1],
    id: createId(),
  }
]

function AdvFilterSelecotrTree() {
  const handleAdd = () => { }
  const handleAddChild = () => { }
  return (
    <div className="adv-filter-selector--tree">
      <AdvFilterSelector onAdd={handleAdd} onAddChild={handleAddChild} depth={0} data={data} />
    </div>
  )
}

export default AdvFilterSelecotrTree;
