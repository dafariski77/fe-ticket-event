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
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { getCookie } from "cookies-next";
import AdminNavbar from "@/components/Admin/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFetch } from "@/features/fetch/useFetch";

export default function CreateEvent() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      date: "",
      about: "",
      category_id: 0,
      venue: "",
      status: "",
      image: null,
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

      mutate(formData);
    },
  });

  const { data } = useFetch({
    url: "cms/category",
    headers: {
      Authorization: `Bearer ${getCookie("auth", { secure: true, path: "/" })}`,
    },
    queryKey: ["events"],
  });
  
  const { mutate, isLoading } = useStore({
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
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              <FormControl>
                <FormLabel>Event Name</FormLabel>
                <Input
                  placeholder="Name"
                  name="name"
                  type="text"
                  onChange={(e) =>
                    formik.setFieldValue(e.target.name, e.target.value)
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Event Date</FormLabel>
                <Input
                  placeholder="Date"
                  name="date"
                  type="date"
                  onChange={(e) =>
                    formik.setFieldValue(e.target.name, e.target.value)
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Event Banner</FormLabel>
                <Input
                  pt={1}
                  placeholder="Image"
                  name="image"
                  type="file"
                  accept="image/"
                  onChange={(e) =>
                    formik.setFieldValue(e.target.name, e.target.files[0])
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Event Description</FormLabel>
                <Textarea
                  placeholder="Description"
                  name="about"
                  type="text"
                  onChange={(e) =>
                    formik.setFieldValue(e.target.name, e.target.value)
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Event Category</FormLabel>
                <Select
                  as={"select"}
                  placeholder="Select Category"
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
              <FormControl>
                <FormLabel>Event Venue</FormLabel>
                <Input
                  placeholder="Venue"
                  name="venue"
                  type="text"
                  onChange={(e) =>
                    formik.setFieldValue(e.target.name, e.target.value)
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Event Status</FormLabel>
                <Select
                  as={"select"}
                  name="status"
                  defaultValue={"Draft"}
                  onChange={(e) =>
                    formik.setFieldValue(e.target.name, e.target.value)
                  }
                >
                  <option value="Draft">Draft</option>
                  <option value="Publish">Publish</option>
                </Select>
              </FormControl>
              <Link href={"/admin/event/"}>
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
