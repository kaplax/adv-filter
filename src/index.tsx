import { createRoot } from "react-dom/client";
import FilterSelector from "./filterSelector";
import { filterField } from "./model/filterField";
import AdvancedSearch from "./test";

const root = document.querySelector("#root") as HTMLDivElement;

createRoot(root).render(
  <div>
    <FilterSelector filterFieldConfig={filterField} />
    {/* <AdvancedSearch /> */}
  </div>
)
