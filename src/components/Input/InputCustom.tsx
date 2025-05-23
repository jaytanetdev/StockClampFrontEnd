import { Form, Input, FormItemProps, InputProps } from "antd";

interface InputCustomProps extends InputProps {
  label?: string;
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
    <div className="w-full">
      <Form.Item
        label={label && <span className={classLabel}>{label}</span>}
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
    </div>
  );
};

export default InputCustom;
