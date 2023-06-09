import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Logo } from "../../../components/auth/Logo";
import { PasswordField } from "@/components/auth/PasswordField";
import Link from "next/link";
import { useState } from "react";
import { Auth } from "@/utils/auth";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const register = await Auth("/register", form);

    if (register?.data.data) {
      router.push("/auth/login");
    }
  };

  return (
    <Container
      maxW="lg"
      py={{
        base: "10",
        md: "12",
      }}
      px={{
        base: "0",
        sm: "8",
      }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack
            spacing={{
              base: "2",
              md: "3",
            }}
            textAlign="center"
          >
            <Heading
              size={{
                base: "xs",
                md: "sm",
              }}
            >
              Register Account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="fg.muted">Already have an account?</Text>
              <Link href={"/auth/login"}>
                <Button variant="text" colorScheme="blue">
                  Sign in
                </Button>
              </Link>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{
            base: "0",
            sm: "8",
          }}
          px={{
            base: "4",
            sm: "10",
          }}
          bg={{
            base: "transparent",
            sm: "bg.surface",
          }}
          boxShadow={{
            base: "none",
            sm: "md",
          }}
          borderRadius={{
            base: "none",
            sm: "xl",
          }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                />
              </FormControl>
              <PasswordField
                name="password"
                id="password"
                title="Password"
                onChange={handleChange}
              />
              <PasswordField
                name="confirmPassword"
                id="confirmPassword"
                title="Confirm Password"
                onChange={handleChange}
              />
            </Stack>
            <Stack spacing="6">
              <Button variant="primary" onClick={handleSubmit}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
