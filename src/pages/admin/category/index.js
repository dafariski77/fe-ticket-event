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

export default function CategoryAdmin() {
  const { data, isLoading, refetch } = useFetch({
    url: "cms/category",
    headers: {
      Authorization: `Bearer ${getCookie("auth", { secure: true, path: "/" })}`,
    },
    queryKey: ["category"],
  });

  const { mutate: deleteData, isLoading: deleteLoading } = useDelete({
    url: "cms/category",
    headers: {
      Authorization: `Bearer ${getCookie("auth", { secure: true, path: "/" })}`,
    },
    onSuccess: () => {
      refetch();
    },
  });

  const renderCategory = () => {
    return data?.data?.data.map((item, i) => {
      return (
        <Tr key={item.id}>
          <Td>{++i}</Td>
          <Td>{item.name}</Td>
          <Td>
            <ButtonGroup>
              <Link href={`/admin/category/edit/${item.id}`}>
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
            <Link href={"/admin/category/create"}>
              <Button>Add Category</Button>
            </Link>
            <TableContainer pt={3}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Name</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {isLoading ? (
                    <Tr>
                      <Td colSpan={3} textAlign="center">
                        <Spinner />
                      </Td>
                    </Tr>
                  ) : !data ? (
                    <Tr>
                      <Td colSpan={3} textAlign="center">
                        <Text>Kosong</Text>
                      </Td>
                    </Tr>
                  ) : (
                    renderCategory()
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
