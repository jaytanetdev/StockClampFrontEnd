import { Button, ButtonProps, Form } from "antd";

interface ButtonCustomProps extends ButtonProps {
  children?: React.ReactNode;
  classNameBtn?: string;
}
const ButtonCustom = ({
  children,
  classNameBtn,
  ...rest
}: ButtonCustomProps) => {
  return (
    <Form.Item className="m-0">
      <Button
        className={`bg-blue-950  border-[#1A237E] text-white font-semibold rounded-lg px-4 ${classNameBtn}`}
        {...rest}
      >
        {children}
      </Button>
    </Form.Item>
  );
};

export default ButtonCustom;
