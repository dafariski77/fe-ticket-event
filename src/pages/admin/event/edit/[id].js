import {
  Button,
  Card,
  CardBody,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { getCookie } from "cookies-next";
import AdminNavbar from "@/components/Admin/Navbar";
import Link from "next/link";
import { usePut } from "@/features/put/usePut";
import { useRouter } from "next/router";
import { useFetch } from "@/features/fetch/useFetch";

export default function CreateCategory() {
  const router = useRouter();

  const { data: dataEvent, isLoading: loadingFetch } = useFetch({
    url: `cms/event/${router.query.id}`,
    headers: {
      Authorization: `Bearer ${getCookie("auth", { secure: true, path: "/" })}`,
    },
    onSuccess: () => {
      formik.setFieldValue("name", dataEvent?.data?.data?.name);
      formik.setFieldValue("date", dataEvent?.data?.data?.date);
      formik.setFieldValue("about", dataEvent?.data?.data?.about);
      formik.setFieldValue("category_id", dataEvent?.data?.data?.category_id);
      formik.setFieldValue("venue", dataEvent?.data?.data?.name);
      formik.setFieldValue("status", dataEvent?.data?.data?.status);
    },
    queryKey: [`event/${router.query.id}`],
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      date: "",
      about: "",
      category_id: 0,
      venue: "",
      status: "",
      image: "",
    },
    onSubmit: () => {
      const { name, date, about, category_id, venue, status, image } =
        formik.values;

      const formData = new FormData();

      formData.append("name", name);
      formData.append("date", date);
      formData.append("about", about);
      formData.append("category_id", category_id);
      formData.append("venue", venue);
      formData.append("status", status);
      formData.append("image", image);

      mutate({ body: formData, id: router.query.id });
    },
  });

  const { data } = useFetch({
    url: "cms/category",
    headers: {
      Authorization: `Bearer ${getCookie("auth", { secure: true, path: "/" })}`,
    },
    queryKey: ["category/event/fetch"],
  });

  const { mutate, isLoading } = usePut({
    url: "cms/event",
    headers: {
      Authorization: `Bearer ${getCookie("auth", { secure: true, path: "/" })}`,
    },
    onSuccess: () => {
      router.push("/admin/event");
    },
  });

  return (
    <AdminNavbar>
      <Container>
        <Card>
          <CardBody>
            {loadingFetch ? (
              <Spinner />
            ) : (
              <form
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
              >
                <FormControl mb={4}>
                  <FormLabel>Event Name</FormLabel>
                  <Input
                    placeholder="Name"
                    name="name"
                    type="text"
                    defaultValue={formik.values.name}
                    onChange={(e) =>
                      formik.setFieldValue(e.target.name, e.target.value)
                    }
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Event Date</FormLabel>
                  <Input
                    value={formik.values.date}
                    placeholder="Date"
                    name="date"
                    type="date"
                    onChange={(e) =>
                      formik.setFieldValue(e.target.name, e.target.value)
                    }
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Event Banner</FormLabel>
                  <Input
                    pt={1}
                    placeholder="Image"
                    name="image"
                    type="file"
                    value={formik.values.image}
                    accept="image/"
                    onChange={(e) =>
                      formik.setFieldValue(e.target.name, e.target.files[0])
                    }
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Event Description</FormLabel>
                  <Textarea
                    placeholder="Description"
                    name="about"
                    value={formik.values.about}
                    type="text"
                    onChange={(e) =>
                      formik.setFieldValue(e.target.name, e.target.value)
                    }
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Event Category</FormLabel>
                  <Select
                    as={"select"}
                    placeholder="Select Category"
                    value={formik.values.category_id}
                    name="category_id"
                    onChange={(e) =>
                      formik.setFieldValue(e.target.name, e.target.value)
                    }
                  >
                    {data?.data?.data?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Event Venue</FormLabel>
                  <Input
                    placeholder="Venue"
                    name="venue"
                    value={formik.values.venue}
                    type="text"
                    onChange={(e) =>
                      formik.setFieldValue(e.target.name, e.target.value)
                    }
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Event Status</FormLabel>
                  <Select
                    as={"select"}
                    name="status"
                    value={formik.values.status}
                    onChange={(e) =>
                      formik.setFieldValue(e.target.name, e.target.value)
                    }
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Publish</option>
                  </Select>
                </FormControl>
                <Link href={"/admin/event/"}>
                  <Button variant={"ghost"} mr={3}>
                    Cancel
                  </Button>
                </Link>
                <Button
                  isLoading={isLoading}
                  type="submit"
                  disabled={isLoading}
                >
                  Save
                </Button>
              </form>
            )}
          </CardBody>
        </Card>
      </Container>
    </AdminNavbar>
  );
}
