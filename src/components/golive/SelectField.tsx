import {
  FormControl,
  FormErrorMessage,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

function SelectField({ name, children, placeholder }: any) {
  const value = useColorModeValue("clique.white", "clique.secondaryGrey1");
  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <Select
            placeholder={placeholder}
            bg={value}
            borderColor={value}
            size="md"
            height={"60px"}
            {...field}
          >
            {children}
          </Select>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}

export default SelectField;
