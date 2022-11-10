import * as yup from "yup";

export const createChannelSchema = yup.object().shape({
  name: yup.string().required("Channel name is required"),
  bioDescription: yup.string().required("Channel bio description is required"),
  subscriptionFee: yup.number().positive().integer().required("Channel subscription fee is required"),
  subscriptionInfo: yup.string().required("Channel subscription info is required"),
});
