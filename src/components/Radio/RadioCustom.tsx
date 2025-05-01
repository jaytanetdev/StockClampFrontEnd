import { Form, FormItemProps, Radio, RadioGroupProps } from "antd";

interface RadioCustomProps extends RadioGroupProps {
  label?: string;
  name: string;
  formItemProps?: FormItemProps;
  classLabel?: string;
}

const RadioCustom = ({
  label,
  name,
  formItemProps,
  classLabel,
  ...rest
}: RadioCustomProps) => {
  return (
    <div className="w-full">
      <Form.Item
        label={label && <span className={classLabel}>{label}</span>}
        name={name}
        validateTrigger={["onChange", "onBlur"]}
        {...formItemProps}
      >
        <Radio.Group block optionType="button" buttonStyle="solid" {...rest} />
      </Form.Item>
    </div>
  );
};

export default RadioCustom;
