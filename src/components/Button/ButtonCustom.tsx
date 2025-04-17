import { Button, ButtonProps, Form } from "antd";

interface ButtonCustomProps extends ButtonProps {
  children?: React.ReactNode;
}
const ButtonCustom = ({ children, ...rest }: ButtonCustomProps) => {
  return (
      <Form.Item>
        <Button
          className={`bg-[#1A237E]  border-[#1A237E] text-white font-semibold rounded-lg px-4 ${
            rest.className ?? ""
          }`}
          {...rest}
        >
          {children}
        </Button>
      </Form.Item>
  );
};

export default ButtonCustom;
