import { Logo } from "@/components/Logo";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiAccountCircleLine } from "react-icons/ri";
import { getCookie, deleteCookie, hasCookie } from "cookies-next";
import { useAuth } from "@/features/auth/useAuth";

export const Navbar = () => {
  const router = useRouter();
  const toast = useToast();
  const check = hasCookie("auth", { secure: true, path: "/" });

  const token = getCookie("auth", { secure: true, path: "/" });
  const bearer = token?.split("|")[1];

  const { mutate } = useAuth({
    url: "/logout",
    onSuccess: (data) => {
      deleteCookie("auth", { secure: true, path: "/" });
      toast({
        title: data.data.message,
        position: "top",
        isClosable: true,
        status: "success",
      });
      router.push("/auth/login");
    },
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
  });

  return (
    <Box
      as="section"
      pb={{
        base: "6",
        md: "12",
      }}
    >
      <Box as="nav" bg="bg.surface" boxShadow="sm">
        <Container
          py={{
            base: "4",
            lg: "5",
          }}
        >
          <HStack spacing="10" justify="space-between">
            <Link href={"/"}>
              <Logo />
            </Link>
            <Flex justify="space-between" flex="1">
              <ButtonGroup variant="text" colorScheme="gray" spacing="8">
                {["Product", "Pricing", "Resources", "Support"].map((item) => (
                  <Button key={item}>{item}</Button>
                ))}
              </ButtonGroup>
              <HStack spacing="3">
                {check ? (
                  <Menu>
                    <MenuButton
                      as={Button}
                      leftIcon={<RiAccountCircleLine />}
                      variant="ghost"
                    >
                      Profile
                    </MenuButton>
                    <MenuList>
                      <MenuGroup title="Profile">
                        <MenuItem>My Account</MenuItem>
                        <MenuItem>Payments </MenuItem>
                        <MenuItem>Docs</MenuItem>
                        <MenuItem onClick={() => mutate({})} color={"red"}>
                          Logout
                        </MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                ) : (
                  <>
                    <Link href={"/auth/login"}>
                      <Button variant="tertiary">Sign in</Button>
                    </Link>
                    <Link href={"/auth/register"}>
                      <Button variant="primary">Sign up</Button>
                    </Link>
                  </>
                )}
              </HStack>
            </Flex>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};
