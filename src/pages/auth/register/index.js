import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PasswordField } from "@/components/PasswordField";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { AlertTop } from "@/components/Alert";
import { Navbar } from "@/components/Navbar";
import { useFormik } from "formik";
import { useAuth } from "@/features/auth/useAuth";

export default function RegisterPage() {
  const router = useRouter();

  const [alert, setAlert] = useState({
    visible: false,
    status: "",
    message: "",
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: () => {
      const { name, email, password, confirmPassword } = formik.values;

      mutate({
        name,
        email,
        password,
        confirmPassword,
      });
    },
  });

  const handleChange = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const { mutate, isLoading } = useAuth({
    url: "/register",
    onSuccess: () => {
      router.push("/auth/login");
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
                <Stack spacing="6" mt={4}>
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
