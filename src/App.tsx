import "./App.css";
import Axios from "axios";
import { FC, ChangeEvent, useState } from "react";
import { Flex, Box, Button, Heading, Text } from "@chakra-ui/react";
import InputCmp from "./components/InputCmp";
import { Password } from "./interfaces";

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
          {passList.map((pass) => {
            return (
              <Flex w={"100%"}>
                <Heading
                  textColor={"maroon"}
                  w={"50%"}
                  fontSize={"xl"}
                  lineHeight={"10"}
                >
                  {pass.app}
                </Heading>
                <Text w={"50%"} fontSize={"lg"} lineHeight={"10"}>
                  Pass: {pass.pass}
                </Text>
              </Flex>
            );
          })}
        </Flex>
      </Box>
    </Flex>
  );
};

export default App;
