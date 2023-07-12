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
import { getCookie } from "cookies-next";
import AdminNavbar from "@/components/Admin/Navbar";
import Link from "next/link";
import { usePut } from "@/features/put/usePut";
import { useRouter } from "next/router";
import { useFetch } from "@/features/fetch/useFetch";

export default function CreateTicket() {
  const router = useRouter();

  const { data: dataTicket } = useFetch({
    url: `cms/ticket/${router.query.id}`,
    headers: {
      Authorization: `Bearer ${getCookie("auth", { secure: true, path: "/" })}`,
    },
    queryKey: [`ticket/${router.query.id}`],
    onSuccess: () => {
      formik.setFieldValue("name", dataTicket?.data.data.name);
      formik.setFieldValue("price", dataTicket?.data.data.price);
      formik.setFieldValue("event_id", dataTicket?.data.data.event_id);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      event_id: 1,
    },
    onSubmit: () => {
      const { name, price, event_id } = formik.values;

      mutate({ body: { name, price, event_id }, id });
    },
  });

  const { data } = useFetch({
    url: "cms/event",
    headers: {
      Authorization: `Bearer ${getCookie("auth", { secure: true, path: "/" })}`,
    },
    queryKey: ["events"],
  });

  const { mutate, isLoading } = usePut({
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
              <FormControl>
                <FormLabel>Ticket Name</FormLabel>
                <Input
                  placeholder="Name"
                  name="name"
                  value={formik.values.name}
                  type="text"
                  onChange={(e) =>
                    formik.setFieldValue(e.target.name, e.target.value)
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Ticket Name</FormLabel>
                <Input
                  placeholder="Price"
                  name="price"
                  value={formik.values.price}
                  type="number"
                  onChange={(e) =>
                    formik.setFieldValue(e.target.name, e.target.value)
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Event Category</FormLabel>
                <Select
                  as={"select"}
                  name="event_id"
                  value={formik.values.event_id}
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
