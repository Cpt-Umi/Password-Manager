import { FC, ChangeEvent } from "react";
import { Input } from "@chakra-ui/react";

interface inputProps {
  type: string;
  name: string;
  placeholder: string;
  handlerOne(event: ChangeEvent<HTMLInputElement>): void;
}

const InputCmp: FC<inputProps> = ({ type, name, placeholder, handlerOne }) => {
  return (
    <Input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={handlerOne}
      bg={"whitesmoke"}
      border={"none"}
      outline={"none"}
      w={"60%"}
      mb={"10px"}
    />
  );
};

export default InputCmp;
