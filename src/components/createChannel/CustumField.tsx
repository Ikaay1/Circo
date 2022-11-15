import {
  FormControl,
  Textarea,
  FormErrorMessage,
  Box,
  Text,
  Input,
} from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

type Props = {
  name: string;
  nameValue: string;
  textArea: boolean;
};

export default function CustumField({ name, nameValue, textArea }: Props) {
  return (
    <Field name={nameValue}>
      {({ field, form: { touched, errors } }: any) => (
        <FormControl isInvalid={errors[field.name] && touched[field.name]}>
          <Box
            bg="clique.secondaryGrey1"
            px="2"
            py="3"
            mb="10"
            borderRadius={"10px"}
            w="70%"
          >
            <Text
              fontSize={"smSubHead"}
              fontWeight="400"
              mb="1"
              color={"clique.secondaryGrey2"}
            >
              {name}
            </Text>
            {textArea ? (
              <Textarea
                variant="filled"
                bg="clique.secondaryGrey1"
                name={nameValue}
                {...field}
              />
            ) : (
              <Input
                variant="filled"
                bg="clique.secondaryGrey1"
                name="name"
                {...field}
              />
            )}

            <FormErrorMessage>{errors[field.name]}</FormErrorMessage>
          </Box>
        </FormControl>
      )}
    </Field>
  );
}
