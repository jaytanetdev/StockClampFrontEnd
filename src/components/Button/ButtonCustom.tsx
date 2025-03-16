import { Button, ButtonProps, Form } from "antd";

interface ButtonCustomProps extends ButtonProps {
    children?: React.ReactNode;

}
const ButtonCustom = ({  children, ...rest }: ButtonCustomProps) => {
  return (
    <div>
      <Form.Item>
        <Button {...rest} className={`bg-[#1A237E]  border-[#1A237E] text-white font-semibold rounded-xl ${rest.className ?? ""}`}>
          {children}
        </Button>
      </Form.Item>
    </div>
  );
};

export default ButtonCustom;
