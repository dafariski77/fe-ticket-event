import { Logo } from "@/components/Logo";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Spinner,
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
import { FiSearch } from "react-icons/fi";

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
    onMutate: () => {
      toast({
        title: <Spinner />,
        position: "top",
        isClosable: true,
        status: "loading",
      });
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
              <InputGroup width={"lg"}>
                <InputLeftElement pointerEvents="none">
                  <FiSearch color="gray.300" />
                </InputLeftElement>
                <Input type="tel" placeholder="Search by event name" />
              </InputGroup>
              <HStack spacing="6" zIndex={5}>
                <ButtonGroup
                  variant="text"
                  colorScheme="gray"
                  spacing="8"
                  alignItems={"center"}
                >
                  <Link href={"/#"}>
                    <Text>Explore</Text>
                  </Link>
                  <Link href={"/category"}>
                    <Text>Tickets</Text>
                  </Link>
                  <Link href={"/#"}>
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
