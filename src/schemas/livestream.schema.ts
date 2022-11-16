import * as yup from "yup";

export const streamSchema = yup.object({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  thumbNail: yup.mixed().required("ThumbNail is Required"),
  ageRange: yup.string().required("Age Range Required"),
  category: yup.string().required("Category is Required"),
  fee: yup.number().required("Fee Required"),
});

export const newStreamSchema = yup.object({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  thumbNail: yup.mixed().required("ThumbNail is Required"),
  ageRange: yup.string().required("Age Range Required"),
  category: yup.string().required("Category is Required"),
  fee: yup.number().required("Fee Required"),
  schedule: yup.string().required("Schedule Date Required"),
});
