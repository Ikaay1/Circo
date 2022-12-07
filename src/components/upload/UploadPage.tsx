import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCategoryQuery } from "redux/services/category.service";
import { useCreateContentMutation } from "redux/services/content.service";

import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  Input,
  Link,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import Btn from "@components/Button/Btn";
import { CategoriesInterface } from "@constants/interface";
import { age, API, selectArr, videoDetails } from "@constants/utils";
import AddIcon from "@icons/AddIcon";
import CopyIcon from "@icons/CopyIcon";

import DetailCard from "./DetailCard";

type Props = {
  url: string;
  name: string;
};
function UploadPage({ url, name }: Props) {
  const [state, setState] = useState({
    title: "",
    description: "",
    category: "Choose Category",
    ageRange: "Age Range",
    video: "",
  });

  const router = useRouter();
  const { data, isLoading } = useCategoryQuery("");
  const [thumbNail, setThumbNail] = useState<string | Blob>("");
  const [imageError, setImageError] = useState<string>("");
  const [createContent, createContentStatus] = useCreateContentMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (state.category === "Choose Category") {
        toast.error("Please choose a category");
        return;
      }
      if (state.ageRange === "Age Range") {
        toast.error("Please choose an age range");
        return;
      }
      if (!thumbNail) {
        toast.error("Please upload a thumbnail");
        return;
      }
      let file = await fetch(url)
        .then((r) => r.blob())
        .then((blobFile) => new File([blobFile], name, { type: "video/mp4" }));
      const formData = new FormData();
      formData.append("title", state.title);
      formData.append("description", state.description);
      formData.append("category", state.category);
      formData.append("ageRange", state.ageRange);
      formData.append("file", file);
      formData.append("thumbNail", thumbNail);
      await createContent(formData);
      router.push("/home");
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (imageError) {
      setTimeout(() => {
        setImageError("");
      }, 3000);
    }
  }, [imageError]);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Flex gap={3} pl="5" pr="12">
        <Box w="20%" maxW="20%" minW="20%" pt="4" pr="2">
          <Text fontSize={"smHead"} mb="5">
            Your video look
          </Text>
          <Box borderRadius={"10px"} overflow="hidden">
            <video width="100%" height={"60px"} src={url} />
          </Box>
          <Text
            fontWeight={600}
            fontSize="smSubHead"
            mb="3"
            className="no-wrap"
            mt="4"
          >
            {state.title}
          </Text>
          <Text fontSize="xsl" noOfLines={5}>
            {state.description}
            {/* <span style={{color: '#3D8EC9'}}> more...</span> */}
          </Text>
        </Box>

        <Flex width="50%">
          <Divider orientation="vertical" bg="clique.secondaryGrey" mr="4" />
          <Box pt="2" pb="5">
            <Text fontSize="head">Video details</Text>

            <VStack align="stretch" mt={4}>
              {videoDetails.map((each) => {
                return (
                  <DetailCard
                    key={each.title}
                    title={each.title}
                    input={each.input}
                    value={state.title}
                    valueArea={state.description}
                    handleInputChange={(event) =>
                      setState({ ...state, title: event?.target?.value })
                    }
                    handleInputChangeArea={(event) =>
                      setState({ ...state, description: event?.target?.value })
                    }
                  />
                );
              })}
            </VStack>
            <Box mt="7" mb="4">
              <Text fontSize="smSubHead">Thumbnail</Text>
              <Text fontSize="xsl" color="clique.secondaryGrey2" mb="2">
                Select or upload a picture that shows what is your video
              </Text>
              <Input
                type={"file"}
                onChange={(e: any) => {
                  e.target.files[0]?.type.includes("image")
                    ? setThumbNail(e.target.files[0])
                    : setImageError("Please choose an image");
                }}
                display={"none"}
                id={"thumbnail"}
              />{" "}
              <label htmlFor={"thumbnail"}>
                {thumbNail && typeof thumbNail !== "string" ? (
                  <Box mt="7">
                    {" "}
                    <Box
                      bgImage={"url(" + URL.createObjectURL(thumbNail) + ")"}
                      rounded="10px"
                      h="120px"
                      w="250px"
                      bgRepeat={"no-repeat"}
                      bgSize={"cover"}
                    ></Box>
                  </Box>
                ) : (
                  <Flex gap="2" mb="4" cursor={"pointer"}>
                    <Flex
                      flexDirection={"column"}
                      alignItems={"center"}
                      justifyContent="center"
                      gap="2"
                      py={4}
                      border="1px"
                      width="40%"
                      borderRadius={"10px"}
                      borderColor="clique.secondaryGrey2"
                      borderStyle="dashed"
                    >
                      <Icon as={AddIcon} />
                      <Text fontSize="smSubHead">Upload Thumbnail</Text>
                    </Flex>
                  </Flex>
                )}
              </label>
              <Text color="red" fontSize="18px">
                {imageError}
              </Text>
            </Box>
            <Text fontSize={"subHead"} mb="4">
              Other Parameters
            </Text>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              {selectArr.map((each, i) => {
                return (
                  <GridItem w="100%" key={i}>
                    <Select
                      placeholder={each.placeholder}
                      bg="clique.secondaryGrey1"
                      borderColor="clique.secondaryGrey1"
                      size="md"
                      height={"40px"}
                      onChange={(e) =>
                        i === 0
                          ? setState((prevState) => ({
                              ...prevState,
                              category: e.target.value,
                            }))
                          : setState((prevState) => ({
                              ...prevState,
                              ageRange: e.target.value,
                            }))
                      }
                    >
                      {i === 0 && (
                        <>
                          {data?.data.map((category: CategoriesInterface) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </>
                      )}
                      {i === 1 && (
                        <>
                          {age.map((eachAge) => (
                            <option key={eachAge} value={eachAge}>
                              {eachAge}
                            </option>
                          ))}
                        </>
                      )}
                    </Select>
                  </GridItem>
                );
              })}
            </Grid>
          </Box>
        </Flex>
        <Flex
          w="30%"
          maxW="30%"
          minW="30%"
          flexDirection={"column"}
          pb="40px"
          gap="100px"
          pt="65px"
        >
          <Box borderRadius={"10px"} overflow="hidden">
            <Box>
              <video width="100%" height={"60px"} src={url} controls />
            </Box>
            <Box
              bg="clique.secondaryGrey1"
              pl="5"
              pt="2"
              pr="6"
              pb="8"
              borderBottomRadius="md"
            >
              <Box>
                <Text fontSize={"0.75rem"}>Video link</Text>
                <Flex justifyContent="space-between" mt="2">
                  <Link fontSize={"0.75rem"} color="clique.primaryBlue">
                    https://clique.com/8u6yt26f
                  </Link>
                  <Icon as={CopyIcon} fontSize="70px" />
                </Flex>
              </Box>
              <Box mt="8">
                <Text fontSize={"0.75rem"}>File name</Text>
                <Text mt="2" fontSize={"0.75rem"}>
                  {name}
                </Text>
              </Box>
            </Box>
          </Box>
          <Btn
            text="upload"
            submit={true}
            isLoading={createContentStatus.isLoading}
          />
        </Flex>
      </Flex>
    </form>
  );
}

export default UploadPage;
