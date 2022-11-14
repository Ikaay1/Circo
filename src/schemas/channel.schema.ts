import * as yup from "yup";

export const createChannelSchema = yup.object().shape({
  name: yup.string().min(3).max(30).required("Channel name is required"),
  bioDescription: yup.string().min(5).required("Channel bio description is required"),
  subscriptionFee: yup.number().positive().integer().required("Channel subscription fee is required"),
  subscriptionInfo: yup.string().min(5).required("Channel subscription info is required"),
});
