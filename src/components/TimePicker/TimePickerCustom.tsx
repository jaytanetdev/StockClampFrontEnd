import { Form, FormItemProps, TimePicker, TimePickerProps } from "antd";

interface TimePickerCustomProps extends TimePickerProps {
  label: string;
  name: string;
  formItemProps?: FormItemProps;
}

const TimePickerCustom = ({
  label,
  name,
  formItemProps,
  ...rest
}: TimePickerCustomProps) => {
  return (
      <Form.Item
        label={<span className=" text-white">{label}</span>}
        name={name}
        validateTrigger={["onChange", "onBlur"]}
        {...formItemProps}
      >
        <TimePicker {...rest}  />
      </Form.Item>
  );
};

export default TimePickerCustom;
