import * as yup from 'yup';

export const updateChannelSchema = yup.object().shape({
  name: yup.string().min(3).max(20),
  bioDescription: yup
    .string()
    .min(5)
    .max(150, 'Bio must be less than 150 characters'),
  subscriptionFee: yup.number().positive().integer(),
  subscriptionInfo: yup.string().min(5),
});
