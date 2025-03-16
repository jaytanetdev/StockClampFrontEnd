import { Form, Input, FormItemProps, InputProps } from "antd";

interface InputCustomProps extends InputProps {
  label: string;
  name: string;
  formItemProps?: FormItemProps;
}

const InputCustom = ({
  label,
  name,
  formItemProps,
  ...rest
}: InputCustomProps) => {
  return (
    <Form.Item
      label={<span className=" text-black ">{label}</span>}
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
