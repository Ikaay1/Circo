import {
  Box,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

type Props = {
  label: string;
  input: boolean;
  name: string;
  type?: string;
  w?: string;
  fee?: boolean;
};

export default function DetailCard({
  name,
  label,
  input,
  type,
  w,
  fee,
}: Props) {
  return (
    <Box
      w={w}
      bg="clique.secondaryGrey1"
      px="2"
      py="3"
      mt="10px"
      borderRadius={"10px"}
    >
      <Text
        px="16px"
        fontSize={"smSubHead"}
        fontWeight="400"
        mb="1"
        color={"clique.secondaryGrey2"}
      >
        {label}
      </Text>
      {input ? (
        <Field name={name}>
          {({ field, form }: any) => (
            <FormControl isInvalid={form.errors[name] && form.touched[name]}>
              <InputGroup>
                {fee && (
                  <InputLeftElement pr="0" pointerEvents="none">
                    N
                  </InputLeftElement>
                )}
                <Input
                  pl={fee && "25px"}
                  variant="filled"
                  bg="clique.secondaryGrey1"
                  {...field}
                  id="title"
                  placeholder={`Enter ${name}`}
                  type={
                    type === "date" ? "datetime-local" : type === "time" ? "time" : "text"
                  }
                />
              </InputGroup>
              <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      ) : (
        <Field name={name}>
          {({ field, form }: any) => (
            <FormControl isInvalid={form.errors[name] && form.touched[name]}>
              <Textarea
                placeholder={`Enter ${name}`}
                {...field}
                variant="filled"
                bg="clique.secondaryGrey1"
              />
              <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      )}
    </Box>
  );
}
