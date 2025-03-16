import { DatePicker, DatePickerProps, Form, FormItemProps } from "antd";

interface DatePickerCustomProps extends DatePickerProps {
  label: string;
  name: string;
  formItemProps?: FormItemProps;
}

const DatePickerCustom = ({
  label,
  name,
  formItemProps,
  ...rest
}: DatePickerCustomProps) => {
  return (
      <Form.Item
        label={<span className=" text-white">{label}</span>}
        name={name}
        validateTrigger={["onChange", "onBlur"]}
        {...formItemProps}
      >
        <DatePicker {...rest} />
      </Form.Item>
  );
};

export default DatePickerCustom;
