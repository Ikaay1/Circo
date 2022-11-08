import {
  Box,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "formik";
import React, { ChangeEvent } from "react";

type Props = {
  label: string;
  input: boolean;
  name: string;
  type?: string;
  w?: string;
};

export default function DetailCard({ name, label, input, type, w }: Props) {
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
              <Input
                variant="filled"
                bg="clique.secondaryGrey1"
                {...field}
                id="title"
                placeholder="Title"
                type={
                  type === "date" ? "date" : type === "time" ? "time" : "text"
                }
              />
              <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      ) : (
        <Field name={name}>
          {({ field, form }: any) => (
            <FormControl isInvalid={form.errors[name] && form.touched[name]}>
              <Textarea
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
