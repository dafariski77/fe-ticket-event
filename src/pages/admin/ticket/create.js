import { useStore } from "@/features/post/useStore";
import {
  Button,
  Card,
  CardBody,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { getCookie } from "cookies-next";
import AdminNavbar from "@/components/Admin/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFetch } from "@/features/fetch/useFetch";

export default function CreateTicket() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      event_id: 0,
    },
    onSubmit: () => {
      const { name, price, event_id } = formik.values;

      mutate({
        name,
        price: Number(price),
        event_id: Number(event_id),
      });
    },
  });

  const { data } = useFetch({
    url: "cms/event",
    headers: {
      Authorization: `Bearer ${getCookie("auth", { secure: true, path: "/" })}`,
    },
    queryKey: ["events"],
  });

  const { mutate, isLoading } = useStore({
    url: "cms/ticket",
    headers: {
      Authorization: `Bearer ${getCookie("auth", { secure: true, path: "/" })}`,
    },
    onSuccess: () => {
      router.push("/admin/ticket");
    },
  });

  return (
    <AdminNavbar>
      <Container>
        <Card>
          <CardBody>
            <form onSubmit={formik.handleSubmit}>
              <FormControl mb={4}>
                <FormLabel>Ticket Name</FormLabel>
                <Input
                  placeholder="Name"
                  name="name"
                  type="text"
                  onChange={(e) =>
                    formik.setFieldValue(e.target.name, e.target.value)
                  }
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Ticket Price</FormLabel>
                <Input
                  placeholder="Price"
                  name="price"
                  type="number"
                  onChange={(e) =>
                    formik.setFieldValue(e.target.name, e.target.value)
                  }
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Event Name</FormLabel>
                <Select
                  as={"select"}
                  name="event_id"
                  placeholder="Select Event"
                  onChange={(e) =>
                    formik.setFieldValue(e.target.name, e.target.value)
                  }
                >
                  {data?.data?.data?.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <Link href={"/admin/ticket/"}>
                <Button variant={"ghost"} mr={3}>
                  Cancel
                </Button>
              </Link>
              <Button isLoading={isLoading} type="submit" disabled={isLoading}>
                Save
              </Button>
            </form>
          </CardBody>
        </Card>
      </Container>
    </AdminNavbar>
  );
}
