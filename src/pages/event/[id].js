import { Navbar } from "@/components/Navbar";
import { useFetch } from "@/features/fetch/useFetch";
import { useStore } from "@/features/post/useStore";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CloseButton,
  Container,
  Divider,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  Image,
  Input,
  Spinner,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaCalendarAlt, FaTags } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { getCookie } from "cookies-next";

export default function DetailEvent() {
  const router = useRouter();

  const [cart, setCart] = useState([]);
  const [visible, setVisible] = useState([]);

  const calculateTotalPrice = () => {
    let total = 0;
    Object.values(cart).forEach((item) => {
      total += item.price * item.amount;
    });
    return total;
  };

  const { data, isLoading, isSuccess } = useFetch({
    url: `event/${router.query.id}`,
    queryKey: [`event/detail/${router.query.id}`],
    enabled: Boolean(router.query.id),
  });

  const { data: dataTicket } = useFetch({
    url: `ticket/event/${router.query.id}`,
    queryKey: ["tickets", router.query.id],
  });

  const { mutate, isLoading: loadingCheckout } = useStore({
    url: "user/order",
    headers: {
      Authorization: `Bearer ${getCookie("auth", { secure: true, path: "/" })}`,
    },
    onSuccess: () => {
      router.push("/transaction");
    },
  });

  const handleAmount = (item, value) => {
    setCart((prevCart) => ({
      ...prevCart,
      [item.id]: {
        ticket_id: item.id,
        event_id: item.event_id,
        price: item.price,
        amount: Number(value),
      },
    }));
    calculateTotalPrice();
  };

  const handleButton = (item) => {
    setVisible((prevVisible) => ({
      ...prevVisible,
      [item.id]: true,
    }));
    handleAmount(item, 1);
  };

  const handleSubmit = () => {
    const detail = Object.entries(cart).map(([key, value]) => ({
      ...value,
    }));

    if (!getCookie("auth", { secure: true, path: "/" })) {
      router.push("/auth/login");
    } else {
      mutate({
        total: calculateTotalPrice(),
        detail,
      });
    }
  };

  const deleteOnCart = (item) => {
    const updatedData = { ...visible, [item.id]: false };

    const foundItem = {
      ...cart,
      [item.id]: {
        amount: 0,
      },
    };

    const updatedCart = Object.fromEntries(
      Object.entries(foundItem).filter(([itemId, data]) => data.amount != 0)
    );

    setCart(updatedCart);
    setVisible(updatedData);
  };

  const renderTicket = () => {
    return dataTicket?.data?.data?.map((item) => {
      return (
        <HStack key={item.id} justifyContent={"space-between"}>
          <Stack spacing={0}>
            <Text>{item.name}</Text>
            <Text fontWeight={"bold"}>Rp {item.price}</Text>
          </Stack>
          {!visible[item.id] ? (
            <Button variant={"outline"} onClick={() => handleButton(item)}>
              Add
            </Button>
          ) : (
            <HStack>
              <Input
                width={"20"}
                key={item.id}
                type="text"
                value={cart[item.id]?.amount || ""}
                onChange={(event) => handleAmount(item, event.target.value)}
              />
              <CloseButton onClick={() => deleteOnCart(item)} />
            </HStack>
          )}
        </HStack>
      );
    });
  };

  return (
    <>
      <Navbar />
      <Box as="section" bg="bg.surface">
        <Container
          py={{
            base: "12",
            md: "18",
          }}
        >
          <Grid h="400px" templateColumns="repeat(7, 1fr)" gap={8}>
            <GridItem colSpan={5}>
              {isLoading && <Spinner />}
              {isSuccess && (
                <Image
                  src={`http://localhost:8000/storage/${data?.data?.data?.image}`}
                  alt={data?.data.data.name}
                  borderRadius="8px"
                  objectFit={"cover"}
                  height={400}
                  w={"100%"}
                  loading="lazy"
                />
              )}

              <Tabs position="relative" variant="unstyled" my={8}>
                <TabList>
                  <Tab fontWeight={"bold"}>Description</Tab>
                </TabList>
                <TabIndicator
                  mt="-1.5px"
                  height="2px"
                  bg="blue.500"
                  borderRadius="1px"
                />
                <TabPanels>
                  <TabPanel>
                    <Text
                      as="pre"
                      whiteSpace={"pre-wrap"}
                      fontFamily={"inherit"}
                    >
                      {data?.data.data.about}
                    </Text>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </GridItem>
            <GridItem colSpan={2}>
              <Card>
                <CardHeader>
                  <Heading size="xs" pb={4}>
                    {data?.data.data.name}
                  </Heading>
                  <Divider />
                </CardHeader>
                <CardBody pt={0}>
                  <Stack>
                    <HStack>
                      <Icon as={FaTags} />
                      <Text>{data?.data.data.category?.name}</Text>
                    </HStack>
                    <HStack>
                      <Icon as={FaCalendarAlt} />
                      <Text>{data?.data.data.date}</Text>
                    </HStack>
                    <HStack>
                      <Icon as={HiLocationMarker} />
                      <Text>{data?.data.data.venue}</Text>
                    </HStack>
                  </Stack>
                </CardBody>
              </Card>
              <Card mt={8}>
                <CardHeader>
                  <Heading size="xs" pb={4}>
                    Ticket Category
                  </Heading>
                  <Divider />
                </CardHeader>
                <CardBody pt={2} maxHeight={"140"} overflow={"auto"}>
                  <Stack spacing={8}>{renderTicket()}</Stack>
                </CardBody>
                <CardFooter>
                  <Stack spacing={4} w={"full"}>
                    <Divider />
                    <HStack justifyContent={"space-between"}>
                      <Text>Sub total : </Text>
                      <Text
                        fontWeight={"bold"}
                        fontSize={"xl"}
                        color="blue.500"
                      >
                        Rp {calculateTotalPrice()}
                      </Text>
                    </HStack>
                    <Button
                      onClick={() => handleSubmit()}
                      isLoading={loadingCheckout}
                    >
                      Checkout
                    </Button>
                  </Stack>
                </CardFooter>
              </Card>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
