import EventList from "@/components/Events";
import { Navbar } from "@/components/Navbar";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import React from "react";

export default function EventPage() {
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
              Upcoming Events
            </Heading>
            <Text>Find your favorite events, and let&lsquo;s have fun</Text>
            <EventList pt={8} />
          </Box>
        </Container>
      </Box>
    </>
  );
}
