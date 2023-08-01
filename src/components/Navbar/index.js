import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiAccountCircleLine } from "react-icons/ri";
import { getCookie, deleteCookie } from "cookies-next";
import { useAuth } from "@/features/auth/useAuth";
import { useContext } from "react";
import { UserContext } from "@/pages/_app";
import SearchInput from "./SearchInput";

export const Navbar = () => {
  const router = useRouter();
  const toast = useToast();

  const { authenticatedUser, setAuthenticatedUser } = useContext(UserContext);

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
      setAuthenticatedUser(null);
      router.push("/auth/login");
    },
    headers: {
      Authorization: `Bearer ${getCookie("auth", { secure: true, path: "/" })}`,
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
              <Image src={"/img/logo2.png"} height="40px" alt="logo" />
            </Link>
            <Flex justify="space-between" flex="1">
              <SearchInput />
              <HStack spacing="6" zIndex={5}>
                <ButtonGroup
                  variant="text"
                  colorScheme="gray"
                  spacing="8"
                  alignItems={"center"}
                >
                  <Link href={"/event"}>
                    <Text>Explore</Text>
                  </Link>
                  <Link href={"/transaction"}>
                    <Text>Transactions</Text>
                  </Link>
                </ButtonGroup>
                {authenticatedUser ? (
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
                        <Link href={"/admin"}>
                          <MenuItem>Dashboard</MenuItem>
                        </Link>
                        <MenuItem onClick={() => mutate({})} color={"red"}>
                          Logout
                        </MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                ) : (
                  <>
                    <Link href={"/auth/login"}>
                      <Button variant="outline">Sign In</Button>
                    </Link>
                    <Link href={"/auth/register"}>
                      <Button variant="primary">Sign Up</Button>
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
