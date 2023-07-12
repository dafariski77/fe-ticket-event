import AdminNavbar from "@/components/Admin/Navbar";
import { useFetch } from "@/features/fetch/useFetch";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Container,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import { getCookie } from "cookies-next";
import React from "react";
import { useDelete } from "@/features/delete/useDelete";
import Image from "next/image";

export default function EventAdmin() {
  const { data, isLoading, refetch } = useFetch({
    url: "cms/event",
    headers: {
      Authorization: `Bearer ${getCookie("auth", { secure: true, path: "/" })}`,
    },
    queryKey: ["events"],
  });

  const { mutate: deleteData, isLoading: deleteLoading } = useDelete({
    url: "cms/event",
    headers: {
      Authorization: `Bearer ${getCookie("auth", { secure: true, path: "/" })}`,
    },
    onSuccess: () => {
      refetch();
    },
  });

  const renderEvent = () => {
    return data?.data?.data?.map((item, i) => {
      return (
        <Tr key={item.id}>
          <Td>{++i}</Td>
          <Td>{item.name}</Td>
          <Td>{item.date}</Td>
          <Td>{item.about}</Td>
          <Td>{item.category?.name}</Td>
          <Td>{item.venue}</Td>
          <Td>{item.status}</Td>
          <Td>
            {item?.image && (
              <Image
                unoptimized
                src={`http://localhost:8000/storage/${item?.image}`}
                width={50}
                height={50}
                alt={item.name}
                loading="lazy"
              />
            )}
          </Td>
          <Td>
            <ButtonGroup>
              <Link href={`/admin/event/edit/${item.id}`}>
                <Button colorScheme="green" variant={"solid"}>
                  Edit
                </Button>
              </Link>
              <Button
                colorScheme="red"
                variant={"solid"}
                onClick={() => deleteData({ id: item.id })}
                isLoading={deleteLoading}
              >
                Delete
              </Button>
            </ButtonGroup>
          </Td>
        </Tr>
      );
    });
  };

  return (
    <AdminNavbar>
      <Container>
        <Card>
          <CardBody>
            <Link href={"/admin/event/create"}>
              <Button>Add Event</Button>
            </Link>
            <TableContainer pt={3}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Name</Th>
                    <Th>Date</Th>
                    <Th>About</Th>
                    <Th>Category</Th>
                    <Th>Venue</Th>
                    <Th>Status</Th>
                    <Th>Image</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {isLoading ? (
                    <Tr>
                      <Td colSpan={9} textAlign="center">
                        <Spinner />
                      </Td>
                    </Tr>
                  ) : !data.data.data ? (
                    <Tr>
                      <Td colSpan={3} textAlign="center">
                        <Text>Kosong</Text>
                      </Td>
                    </Tr>
                  ) : (
                    renderEvent()
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </Container>
    </AdminNavbar>
  );
}
