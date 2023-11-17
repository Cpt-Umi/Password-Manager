import "./App.css";
import Axios from "axios";
import { FC, ChangeEvent, useState } from "react";
import { Flex, Box, Button, Heading } from "@chakra-ui/react";
import InputCmp from "./components/InputCmp";
import { Encryption, Password } from "./interfaces";

const App: FC = () => {
  const [password, setPassword] = useState<string>("");
  const [application, setApplication] = useState<string>("");
  const [passList, setPassList] = useState<Password[]>([]);

  const handlerOne = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    if (event.target.name === "pass") {
      setPassword(event.target.value);
    } else {
      setApplication(event.target.value);
    }
  };

  const addPassword = (): void => {
    Axios.post(`http://localhost:5000/addpassword`, {
      password: password,
      application: application,
    });
  };

  const handlerTwo = (): void => {
    Axios.get(`http://localhost:5000/getpasswords`).then((res) =>
      setPassList(res.data)
    );
  };

  const decryptPassword = (encryption: Encryption): any => {
    Axios.post(`http://localhost:5000/decryptpassword`, {
      password: encryption.password,
      iv: encryption.iv,
    }).then((res) => {
      setPassList(
        passList.map((val) => {
          return val.id === encryption.id
            ? { id: val.id, pass: val.pass, app: res.data, iv: val.iv }
            : val;
        })
      );
    });
  };

  return (
    <Flex flexDirection={"column"} justify={"center"} align={"center"}>
      <Box
        bg={"lightskyblue"}
        w={"540px"}
        h={"400px"}
        mt={"15px"}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={"md"}
      >
        <InputCmp
          type="text"
          name="pass"
          placeholder="Password..."
          handlerOne={handlerOne}
        />
        <InputCmp
          type="text"
          name="application"
          placeholder="Website/App"
          handlerOne={handlerOne}
        />
        <Button onClick={addPassword} w={"50%"}>
          Save Password
        </Button>
      </Box>
      <Box
        bg={"lightskyblue"}
        w={"540px"}
        minH={"20px"}
        mt={"15px"}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={"md"}
      >
        <Button mt={"15px"} onClick={handlerTwo} width={"50%"}>
          Refresh
        </Button>
        <Flex
          mt={"15px"}
          justify={"space-between"}
          align={"center"}
          justifyContent={"center"}
          w={"98%"}
          flexDir={"column"}
        >
          {passList.map((pass, key) => {
            return (
              <Box
                w={"50%"}
                onClick={() => {
                  decryptPassword({
                    id: pass.id,
                    password: pass.pass,
                    iv: pass.iv,
                  });
                }}
                key={key}
                cursor={"pointer"}
                mb={"5px"}
              >
                <Heading fontSize={"2xl"}>{pass.app}</Heading>
              </Box>
            );
          })}
        </Flex>
      </Box>
    </Flex>
  );
};

export default App;
