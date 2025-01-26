import { z } from "zod";

export const userUpdateSchema = z
  .object({
    id: z.string().nonempty("ID is required"),
    email: z.string().email("Invalid email"),
    name: z.string().nonempty("Name is required"),
    address: z.object({
      street: z.string().nonempty("Street is required"),
      city: z.string().nonempty("City is required"),
      state: z.string().nonempty("State is required"),
      neighborhood: z.string().nonempty("Neighborhood is required"),
      zip: z.string().nonempty("ZIP is required"),
      number: z.string().nonempty("Number is required"),
      country: z.string().nonempty("Country is required"),
    }),
    password: z.string().optional(),
    newPassword: z.string().optional(),
  })
  .refine(
    (data) =>
      (data.password && data.newPassword) ||
      (!data.password && !data.newPassword),
    {
      message: "Both password and newPassword must be provided together",
      path: ["password", "newPassword"],
    }
  );

export type IUserUpdate = z.infer<typeof userUpdateSchema>;
