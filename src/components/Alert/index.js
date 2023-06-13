import { Alert, AlertIcon } from "@chakra-ui/react";

export const AlertTop = ({ message, status }) => {
  return (
    <Alert status={status} variant="left-accent">
      <AlertIcon />
      {message}
    </Alert>
  );
};
