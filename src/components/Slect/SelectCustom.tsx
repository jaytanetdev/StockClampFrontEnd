import {
  Form,
  FormItemProps,
  Select,
  SelectProps,
} from "antd";

interface SelectCustomProps extends SelectProps {
  label: string;
  name: string;
  formItemProps?: FormItemProps;
  classLabel?: string;
}

const SelectCustom = ({
  label,
  name,
  formItemProps,
  classLabel,
  ...rest
}: SelectCustomProps) => {
  return (
    <Form.Item
      label={<span className={` ${classLabel}`}>{label}</span>}
      name={name}
      validateTrigger={["onChange", "onBlur"]}
      {...formItemProps}
    >
      <Select showSearch optionFilterProp="label" {...rest} />
    </Form.Item>
  );
};

export default SelectCustom;
