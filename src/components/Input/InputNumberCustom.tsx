import { Form, FormItemProps, InputNumber, InputNumberProps } from "antd";

interface InputNumberCustomProps extends InputNumberProps {
  label?: string;
  name: string;
  formItemProps?: FormItemProps;
  classLabel?: string;
}

const InputNumberCustom = ({
  label,
  name,
  formItemProps,
  classLabel,
  ...rest
}: InputNumberCustomProps) => {
  return (
    <div className="w-full">
      <Form.Item
        label={label && <span className={classLabel}>{label}</span>}
        name={name}
        validateTrigger={["onChange", "onBlur"]}
        {...formItemProps}
      >
        <InputNumber
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
          {...rest}
        />
      </Form.Item>
    </div>
  );
};

export default InputNumberCustom;
