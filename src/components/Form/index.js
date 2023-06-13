import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

export default function TextForm(props) {
  return (
    <FormControl>
      <FormLabel htmlFor="email">{props.title}</FormLabel>
      <Input {...props} />
    </FormControl>
  );
}
