import { Select } from "antd";

const opts = [
  { label: "与", value: "and" },
  { label: "或", value: "or" },
]
function LogicSelector() {
  return (
    <div className="logic-selector">
      <div className="logic-selector--line" />
      <Select defaultValue="and" style={{ width: 60 }} options={opts} />
      <div className="logic-selector--line" />
    </div>
  )
}

export default LogicSelector;
