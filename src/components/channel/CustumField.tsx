import { Field } from "formik";
import React, { useState } from "react";

import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";

type Props = {
  name: string;
  nameValue: string;
  textArea: boolean;
  variant?: "small" | "medium" | "large";
  maxChar?: number;
};

export default function CustumField({
  name,
  nameValue,
  textArea,
  variant,
  maxChar,
}: Props) {
  const value = useColorModeValue("clique.white", "clique.secondaryGrey1");
  const [count, setCount] = useState(0);
  return (
    <Field name={nameValue}>
      {({ field, form: { touched, errors, setFieldValue } }: any) => (
        <FormControl isInvalid={errors[field.name] && touched[field.name]}>
          <Box
            bg={value}
            px="2"
            py="3"
            mb="5"
            borderRadius={"10px"}
            w={variant === "small" ? "70%" : "100%"}
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
              <>
                <Textarea
                  variant="filled"
                  bg={value}
                  name={nameValue}
                  id={nameValue}
                  onChange={(e) => {
                    console.log(field);
                    setCount(e.target.value.length);
                    setFieldValue(field.name, e.target.value);
                  }}
                  // {...field}
                />
                {maxChar && (
                
                    <Text textAlign="right" fontSize="sm" color={count > maxChar ? "red" : ""}>
                      {count.toString()}/{maxChar.toString()}
                    </Text>
                
                )}
              </>
            ) : (
              <Input variant="filled" bg={value} name="name" {...field} />
            )}

            <FormErrorMessage>{errors[field.name]}</FormErrorMessage>
          </Box>
        </FormControl>
      )}
    </Field>
  );
}
