import { DatePicker,  Form, FormItemProps } from "antd";
import { RangePickerProps} from "antd/es/date-picker";

interface RangePickerCustomProps extends RangePickerProps {
  label: string;
  formItemProps?: FormItemProps;
  name: string;
}
const { RangePicker } = DatePicker;

const RangePickerCustom = ({
  label,
  name,
  formItemProps,
  ...rest
}: RangePickerCustomProps) => {
  return (
    <Form.Item
      label={<span className=" text-white">{label}</span>}
      name={name}
      validateTrigger={["onChange", "onBlur"]}
      {...formItemProps}
    >
      <RangePicker {...rest} />
    </Form.Item>
  );
};

export default RangePickerCustom;
