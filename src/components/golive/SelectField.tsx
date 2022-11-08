import { FormControl, FormErrorMessage, Select } from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

function SelectField({ name, children, placeholder }: any) {
  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <Select
            placeholder={placeholder}
            bg="clique.secondaryGrey1"
            borderColor="clique.secondaryGrey1"
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
