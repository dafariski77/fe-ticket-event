import EventList from "@/components/Events";
import { Navbar } from "@/components/Navbar";
import { useFetch } from "@/features/fetch/useFetch";
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import moment from "moment/moment";
import React from "react";

export default function TransactionPage() {
  const { data: dataUser } = useFetch({
    url: "user",
    headers: {
      Authorization: `Bearer ${getCookie("auth", { secure: true, path: "/" })}`,
    },
    queryKey: ["user"],
  });

  const {
    data: dataTransaction,
    isLoading,
    refetch,
  } = useFetch({
    url: `user/order/${dataUser?.data?.id}`,
    headers: {
      Authorization: `Bearer ${getCookie("auth", { secure: true, path: "/" })}`,
    },
    queryKey: [`order/${dataUser?.data?.id}`],
  });

  return (
    <>
      <Navbar />
      <Box as="section" bg="bg.surface">
        <Container
          pb={{
            base: "2",
            md: "4",
          }}
        >
          <Box>
            <Heading size="sm" as={"h4"} fontWeight={"bold"}>
              Recent Transactions
            </Heading>
            <Stack mt={4} spacing={8}>
              {isLoading && <Spinner />}
              {dataTransaction?.data?.data.map((item, key) => (
                <Box
                  px={{ base: "4", md: "6" }}
                  py={{ base: "5", md: "6" }}
                  bg="bg.surface"
                  borderRadius="lg"
                  boxShadow="sm"
                  key={key}
                >
                  <Flex justifyContent={"space-between"}>
                    <VStack align={"start"}>
                      <Text
                        fontSize="sm"
                        color="#949796"
                        lineHeight="none"
                        fontWeight={"bold"}
                      >
                        {moment(item.created_at).format("DD-MM-YYYY")}
                      </Text>
                      <Text>Transaction ID : #{item.id}</Text>
                    </VStack>
                    <VStack align={"end"}>
                      <Text>Total Pay</Text>
                      <Text fontWeight={"bold"} fontSize={"xl"}>
                        Rp {item.total}
                      </Text>
                    </VStack>
                  </Flex>
                  <Divider my={4} />
                  <Text my={4} fontWeight={"bold"} fontSize={"lg"}>
                    Ordered Tickets
                  </Text>
                  {item.order_detail.map((detail, key) => (
                    <>
                      <Text>{detail[0]?.event?.name}</Text>
                      <Flex justifyContent={"space-between"} key={key} mb={2}>
                        <Text>
                          {detail.ticket.name} ({detail.event.name})
                        </Text>
                        <Text></Text>
                        <Text fontWeight={"bold"} fontSize={"lg"}>
                          Rp {detail.ticket.price}
                        </Text>
                      </Flex>
                    </>
                  ))}
                </Box>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}
