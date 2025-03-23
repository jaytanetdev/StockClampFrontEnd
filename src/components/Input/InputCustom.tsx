import { Form, Input, FormItemProps, InputProps } from "antd";

interface InputCustomProps extends InputProps {
  label: string;
  name: string;
  formItemProps?: FormItemProps;
  classLabel?: string;
}

const InputCustom = ({
  label,
  name,
  formItemProps,
  classLabel,
  ...rest
}: InputCustomProps) => {
  return (
    <Form.Item
      label={<span className={` ${classLabel}`}>{label}</span>}
      name={name}
      validateTrigger={["onChange", "onBlur"]}
      {...formItemProps}
    >
      {rest.type === "password" ? (
        <Input.Password {...rest} />
      ) : (
        <Input {...rest} />
      )}
    </Form.Item>
  );
};

export default InputCustom;
