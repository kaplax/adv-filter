import React, { useState } from 'react';
import { Select, Input, Space, Button, Form, Row, Col } from 'antd';
import { SelectValue } from 'antd/lib/select';

const { Option } = Select;

interface Filter {
  label: string;
  condition: string;
  value: string;
  children?: Filter[];
}

const AdvancedSearch: React.FC = () => {
  const [filters, setFilters] = useState<Filter[]>([]);

  const handleAddFilter = () => {
    const newFilter: Filter = {
      label: 'Label',
      condition: 'contains',
      value: '',
      children: [],
    };
    setFilters([...filters, newFilter]);
  };

  const handleRemoveFilter = (index: number) => {
    const updatedFilters = filters.filter((_, idx) => idx !== index);
    setFilters(updatedFilters);
  };

  const handleAddChildFilter = (parentIndex: number) => {
    const updatedFilters = [...filters];
    updatedFilters[parentIndex].children = [
      ...updatedFilters[parentIndex].children!,
      { label: 'Child Label', condition: 'contains', value: '' },
    ];
    setFilters(updatedFilters);
  };

  const handleRemoveChildFilter = (parentIndex: number, childIndex: number) => {
    const updatedFilters = [...filters];
    updatedFilters[parentIndex].children = updatedFilters[parentIndex].children!.filter(
      (_, idx) => idx !== childIndex
    );
    setFilters(updatedFilters);
  };

  const handleLabelChange = (value: string, index: number) => {
    const updatedFilters = [...filters];
    updatedFilters[index].label = value;
    setFilters(updatedFilters);
  };

  const handleConditionChange = (value: string, index: number) => {
    const updatedFilters = [...filters];
    updatedFilters[index].condition = value;
    setFilters(updatedFilters);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedFilters = [...filters];
    updatedFilters[index].value = e.target.value;
    setFilters(updatedFilters);
  };

  const renderChildFilters = (parentIndex: number) => {
    return filters[parentIndex]?.children?.map((childFilter, childIndex) => (
      <Row key={childIndex} style={{ marginBottom: 8 }}>
        <Col span={6}>
          <Select
            value={childFilter.label}
            onChange={(value: SelectValue) => handleLabelChange(value as string, parentIndex)}
            style={{ width: '100%' }}
          >
            <Option value="Child Label">Child Label</Option>
            {/* Add more child options here */}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            value={childFilter.condition}
            onChange={(value: SelectValue) => handleConditionChange(value as string, parentIndex)}
            style={{ width: '100%' }}
          >
            <Option value="contains">包含</Option>
            <Option value="not_contains">不包含</Option>
            {/* Add more options here */}
          </Select>
        </Col>
        <Col span={6}>
          <Input
            value={childFilter.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(e, parentIndex)}
            placeholder="Value"
          />
        </Col>
        <Col span={6}>
          <Button onClick={() => handleRemoveChildFilter(parentIndex, childIndex)}>Remove Child</Button>
        </Col>
      </Row>
    ));
  };

  const renderFilters = () => {
    return filters.map((filter, index) => (
      <div key={index}>
        <Row style={{ marginBottom: 8 }}>
          <Col span={6}>
            <Select
              value={filter.label}
              onChange={(value: SelectValue) => handleLabelChange(value as string, index)}
              style={{ width: '100%' }}
            >
              <Option value="Label">Label</Option>
              {/* Add more options here */}
            </Select>
          </Col>
          <Col span={6}>
            <Select
              value={filter.condition}
              onChange={(value: SelectValue) => handleConditionChange(value as string, index)}
              style={{ width: '100%' }}
            >
              <Option value="contains">包含</Option>
              <Option value="not_contains">不包含</Option>
              {/* Add more options here */}
            </Select>
          </Col>
          <Col span={6}>
            <Input
              value={filter.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(e, index)}
              placeholder="Value"
            />
          </Col>
          <Col span={6}>
            <Button onClick={() => handleAddChildFilter(index)}>Add Child Filter</Button>
            <Button onClick={() => handleRemoveFilter(index)}>Remove</Button>
          </Col>
        </Row>
        {renderChildFilters(index)}
      </div>
    ));
  };

  return (
    <div>
      <Form>
        {renderFilters()}
        <Row>
          <Col span={24}>
            <Space>
              <Button onClick={handleAddFilter}>Add Filter</Button>
              <Button type="primary">Search</Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AdvancedSearch;

