import {
  Box,
  Button,
  Checkbox,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { PasswordField } from "@/components/PasswordField";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { AlertTop } from "@/components/Alert";
import { Navbar } from "@/components/Navbar";
import TextForm from "@/components/Form";
import { useAuth } from "@/features/auth/useAuth";
import { useFormik } from "formik";
import { setCookie } from "cookies-next";
import { UserContext } from "@/pages/_app";

export default function LoginPage() {
  const router = useRouter();

  const { setAuthenticatedUser } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {
      const { email, password } = formik.values;

      mutate({
        email,
        password,
      });
    },
  });

  const handleChange = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const [alert, setAlert] = useState({
    visible: false,
    status: "",
    message: "",
  });

  const { mutate, isLoading } = useAuth({
    url: "/login",
    onSuccess: (data) => {
      setCookie("auth", data.data.token, { secure: true, path: "/" });
      setAuthenticatedUser(data.data);
      router.push("/");
    },
    onError: (error) => {
      const errorMsg = error?.response?.data?.message;
      setAlert({
        status: "error",
        visible: true,
        message: errorMsg,
      });
    },
  });

  return (
    <>
      <Navbar />
      <Container
        maxW="lg"
        px={{
          base: "0",
          sm: "8",
        }}
      >
        <Stack spacing="8">
          <Stack spacing="6">
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
                Log in to your account
              </Heading>
              <HStack spacing="1" justify="center">
                <Text color="fg.muted">Dont have an account?</Text>
                <Link href={"/auth/register"}>
                  <Button variant="text" colorScheme="blue">
                    Sign up
                  </Button>
                </Link>
              </HStack>
            </Stack>
          </Stack>
          {alert.visible && (
            <AlertTop status={alert.status} message={alert.message} />
          )}
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
              <form onSubmit={formik.handleSubmit}>
                <Stack spacing="5">
                  <TextForm
                    title={"Email"}
                    id="email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                  />
                  <PasswordField
                    name="password"
                    id="password"
                    title="Password"
                    onChange={handleChange}
                  />
                </Stack>
                <HStack justify="space-between" my={5}>
                  <Checkbox defaultChecked>Remember me</Checkbox>
                  <Button variant="text" colorScheme="blue" size="sm">
                    Forgot password?
                  </Button>
                </HStack>
                <Stack spacing="6">
                  <Button
                    variant="primary"
                    type="submit"
                    isLoading={isLoading}
                    disabled={isLoading}
                  >
                    Sign in
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
