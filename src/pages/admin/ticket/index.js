import AdminNavbar from "@/components/Admin/Navbar";
import { useFetch } from "@/features/fetch/useFetch";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Container,
  FormControl,
  Select,
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
import { useFormik } from "formik";

export default function EventAdmin() {
  const formik = useFormik({
    initialValues: {
      id: 1,
    },
  });

  const { data, isLoading, refetch } = useFetch({
    url: `cms/ticket/event/${formik.values.id}`,
    headers: {
      Authorization: `Bearer ${getCookie("auth", { secure: true, path: "/" })}`,
    },
    queryKey: ["tickets", formik.values.id],
  });

  const { data: dataEvent } = useFetch({
    url: `cms/event`,
    headers: {
      Authorization: `Bearer ${getCookie("auth", { secure: true, path: "/" })}`,
    },
    queryKey: ["events"],
  });

  const { mutate: deleteData, isLoading: deleteLoading } = useDelete({
    url: `cms/ticket`,
    headers: {
      Authorization: `Bearer ${getCookie("auth", { secure: true, path: "/" })}`,
    },
    onSuccess: () => {
      refetch();
    },
  });

  const renderTicket = () => {
    return data?.data?.data?.map((item, i) => {
      return (
        <Tr key={item.id}>
          <Td>{++i}</Td>
          <Td>{item.name}</Td>
          <Td>{item.price}</Td>
          <Td>
            <ButtonGroup>
              <Link href={`/admin/ticket/edit/${item.id}`}>
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
            <Link href={"/admin/ticket/create"}>
              <Button>Add Category</Button>
            </Link>
            <FormControl>
              <Select
                as={"select"}
                name="id"
                onChange={(e) =>
                  formik.setFieldValue(e.target.name, e.target.value)
                }
              >
                {dataEvent?.data?.data?.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <TableContainer pt={3}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Name</Th>
                    <Th>Price</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {isLoading ? (
                    <Tr>
                      <Td colSpan={4} textAlign="center">
                        <Spinner />
                      </Td>
                    </Tr>
                  ) : !data?.data?.data ? (
                    <Tr>
                      <Td colSpan={3} textAlign="center">
                        <Text>Kosong</Text>
                      </Td>
                    </Tr>
                  ) : (
                    renderTicket()
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
