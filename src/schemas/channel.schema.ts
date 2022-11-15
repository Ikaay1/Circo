import * as yup from "yup";

export const updateChannelSchema = yup.object().shape({
  name: yup.string().min(3).max(30),
  bioDescription: yup.string().min(5),
  subscriptionFee: yup.number().positive().integer(),
  subscriptionInfo: yup.string().min(5)
});
