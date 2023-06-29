import Head from "next/head";
import { Navbar } from "@/components/Navbar";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Container,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import CarouselSwipe from "@/components/Carousel";
import PostCard from "@/components/Card";
import EventList from "@/components/Events";
import { FooterSection } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <Box as="section" bg="bg.surface">
          <Container
            py={{
              base: "12",
              md: "18",
            }}
          >
            <CarouselSwipe />
            <Box my={12}>
              <Heading size="sm" as={"h4"} fontWeight={"bold"}>
                Upcoming Events
              </Heading>
              <Text>Find your favorite events, and let&lsquo;s have fun</Text>
              <EventList pt={8} />
            </Box>
          </Container>
        </Box>
        <FooterSection />
      </main>
    </>
  );
}
