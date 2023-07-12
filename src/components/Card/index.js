import React from "react";
import { Card, CardBody, Stack, Heading, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

const PostCard = ({ dataProps }) => {
  return dataProps?.data?.data?.map((item, i) => {
    return (
      <Card maxW="sm" key={item.id}>
        <CardBody>
          <Image
            src={`http://localhost:8000/storage/${item.image}`}
            borderRadius="8px"
            alt="test"
            objectFit={"cover"}
            height={140}
            w={"100%"}
            loading="lazy"
          />
          <Stack mt="6" spacing="3">
            <Text
              fontSize="sm"
              color="#949796"
              lineHeight="none"
              fontWeight={"bold"}
            >
              {item.date}
            </Text>
            <Link href={`/event/${item.id}`}>
              <Heading fontWeight={"normal"} fontSize="lg" lineHeight="none">
                {item.name}
              </Heading>
            </Link>

            <Text fontSize="sm" color="#949796">
              {item.venue}
            </Text>
            <Text fontWeight={"bold"} lineHeight={"none"} pb={4}>
              {item?.ticket_category[0]?.price == 0
                ? "FREE"
                : `Rp ${item?.ticket_category[0]?.price}`}
            </Text>
          </Stack>
        </CardBody>
      </Card>
    );
  });
};

export default PostCard;
