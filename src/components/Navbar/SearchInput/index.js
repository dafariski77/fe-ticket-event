import { useFetch } from "@/features/fetch/useFetch";
import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchInput() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isFocused, setIsFocused] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [keyword, setKeyword] = useState("");

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const { data, refetch, isLoading } = useFetch({
    url: `search/event?name=${keyword}`,
    queryKey: [`search/${keyword}`],
    cacheTime: 0,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const debouncedRefetch = debounce(() => {
    refetch();
  }, 700);

  const handleSearch = (event) => {
    const newKeyword = event.target.value;
    setKeyword(newKeyword);

    if (isFocused && newKeyword.trim().length > 0) {
      setIsSearch(true);

      debouncedRefetch();
    } else {
      setIsSearch(false);
    }
  };

  return (
    <>
      <InputGroup width={"lg"} onClick={onOpen} cursor={"pointer"}>
        <InputLeftElement pointerEvents="none">
          <FiSearch color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search by event name"
          pointerEvents="none"
        />
      </InputGroup>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup onClick={onOpen} mb={4}>
              <InputLeftElement pointerEvents="none">
                <FiSearch color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search by event name"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleSearch}
              />
            </InputGroup>
            <Box>
              {isLoading && <Spinner />}
              {isSearch && data && (
                <VStack align={"start"}>
                  {data?.data?.data?.map((item) => (
                    <Link key={item.id} href={`/event/${item.id}`}>
                      <HStack mb={4}>
                        <Image
                          src={`http://localhost:8000/storage/${item?.image}`}
                          alt={item.name}
                          borderRadius="20px"
                          height={60}
                          width={120}
                          w={"100%"}
                        />
                        <VStack align={"start"} ms={4}>
                          <Text fontSize={"md"} fontWeight={"semibold"}>
                            {item.name}
                          </Text>
                          <Text>{item.date}</Text>
                        </VStack>
                      </HStack>
                    </Link>
                  ))}
                </VStack>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
