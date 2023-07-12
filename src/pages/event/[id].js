import { Navbar } from "@/components/Navbar";
import { useFetch } from "@/features/fetch/useFetch";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Divider,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  Image,
  Input,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useNumberInput,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaCalendarAlt, FaTags } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";

export default function DetailEvent() {
  const router = useRouter();

  const [cart, setCart] = useState([]);
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(1);

  const { data } = useFetch({
    url: `event/${router.query.id}`,
    cacheTime: 0,
    queryKey: [`event/detail/${router.query.id}`],
  });

  const { data: dataTicket } = useFetch({
    url: `ticket/event/${router.query.id}`,
    queryKey: ["tickets", router.query.id],
  });

  const addItem = (item) => {
    const newItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      amount: 1,
    };

    setCount(1);
    setVisible(false);
    setCart([...cart, newItem]);
  };

  const handleAmount = (value, itemId) => {
    const foundItem = cart.find((item) => item.id == itemId);
    if (foundItem) {
      foundItem.amount = Number(value);
      const filteredItems = cart.filter((item) => item.amount !== 0);
      setCart(filteredItems);
    } else {
      console.log("Item not found");
    }
  };

  const handleInput = (value) => {
    if (value < 1) {
      setCount(0);
      setVisible(true);
    }

    setCount(value);
    handleAmount(value, 1);
  };

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      defaultValue: count,
      step: 1,
      min: 0,
      max: 20,
      onChange: handleInput,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const renderTicket = () => {
    return dataTicket?.data?.data?.map((item) => {
      return (
        <>
          <HStack key={item.id} justifyContent={"space-between"}>
            <Text>{item.name}</Text>
            {visible ? (
              <Button variant={"outline"} onClick={() => addItem(item)}>
                Add
              </Button>
            ) : (
              <HStack maxW="320px">
                <Button {...dec}>-</Button>
                <Input {...input} width={12} textAlign={"center"} />
                <Button {...inc}>+</Button>
              </HStack>
            )}
          </HStack>
        </>
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
              <Image
                src={`http://localhost:8000/storage/${data?.data?.data?.image}`}
                alt={data?.data.data.name}
                borderRadius="8px"
                objectFit={"cover"}
                height={400}
                w={"100%"}
                loading="lazy"
              />
              <Tabs position="relative" variant="unstyled" mt={8}>
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
                    <p>{data?.data.data.about}</p>
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
                      <Text>{data?.data.data.category_id}</Text>
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
                <CardBody pt={2}>
                  <Stack spacing={8}>{renderTicket()}</Stack>
                </CardBody>
                <CardFooter>
                  <Stack spacing={4} w={"full"}>
                    <Divider />
                    <HStack justifyContent={"space-between"}>
                      <Text>Sub total : </Text>
                      <Text fontWeight={"bold"} fontSize={"xl"}>
                        Rp 90.000
                      </Text>
                    </HStack>
                    <Button onClick={() => console.log(cart)}>Checkout</Button>
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
