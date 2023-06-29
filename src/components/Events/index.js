import { useFetch } from "@/features/fetch/useFetch";
import { SimpleGrid, Spinner } from "@chakra-ui/react";
import React from "react";
import PostCard from "../Card";

export default function EventList(props) {
  const { data, isLoading } = useFetch({
    url: "/event",
    queryKey: ["events"],
  });

  return (
    <SimpleGrid spacing="40px" columns={[2, null, 4]} {...props}>
      {isLoading ? <Spinner /> : <PostCard dataProps={data} />}
      {isLoading ? <Spinner /> : <PostCard dataProps={data} />}
      {isLoading ? <Spinner /> : <PostCard dataProps={data} />}
      {isLoading ? <Spinner /> : <PostCard dataProps={data} />}
    </SimpleGrid>
  );
}
