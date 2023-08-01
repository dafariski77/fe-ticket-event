import { useStore } from "@/features/post/useStore";
import {
  Button,
  Card,
  CardBody,
  Container,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { getCookie } from "cookies-next";
import AdminNavbar from "@/components/Admin/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CreateCategory() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: () => {
      const { name } = formik.values;

      mutate({
        name,
      });
    },
  });

  const { mutate, isLoading } = useStore({
    url: "cms/category",
    headers: {
      Authorization: `Bearer ${getCookie("auth", { secure: true, path: "/" })}`,
    },
    onSuccess: () => {
      router.push('/admin/category')
    },
  });

  return (
    <AdminNavbar>
      <Container>
        <Card>
          <CardBody>
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>Category Name</FormLabel>
                <Input
                  placeholder="Name"
                  name="name"
                  type="text"
                  onChange={(e) =>
                    formik.setFieldValue(e.target.name, e.target.value)
                  }
                  my={4}
                />
              </FormControl>
              <Link href={"/admin/category/"}>
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
