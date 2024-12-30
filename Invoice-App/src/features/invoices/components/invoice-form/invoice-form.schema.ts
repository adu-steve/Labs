import { z } from "zod";

const addressSchema = z.object({
  street: z
    .string()
    .trim()
    .min(1, { message: "Required" })
    .max(255, { message: "Max length: 255" }),
  city: z
    .string()
    .trim()
    .min(1, { message: "Required" })
    .max(255, { message: "Max length: 255" }),
  postCode: z
    .string()
    .trim()
    .min(1, { message: "Required" })
    .max(255, { message: "Max length: 255" }),
  country: z
    .string()
    .trim()
    .min(1, { message: "Required" })
    .min(4, { message: "Min length: 4" })
    .max(255, { message: "Max length: 255" }),
});

export const schema = z.object({
  id: z.string().optional(),
  clientName: z
    .string()
    .trim()
    .min(1, { message: "Required" })
    .min(4, { message: "Min length: 4" })
    .max(40, { message: "Max length: 40" }),
  clientEmail: z
    .string()
    .trim()
    .min(1, { message: "Required" })
    .max(255, { message: "Max length: 255" })
    .email(),
  description: z
    .string()
    .trim()
    .min(1, { message: "Required" })
    .max(255, { message: "Max length: 255" }),
  createdAt: z.string().refine((val: string) => !isNaN(Number(new Date(val))), {
    message: "Invalid date",
  }),
  senderAddress: addressSchema,
  clientAddress: addressSchema,
  paymentTerms: z.number(),
  items: z
    .object({
      id: z.string().uuid(),
      name: z
        .string()
        .trim()
        .min(1, { message: "Required" })
        .max(255, { message: "Max Length: 255" }),
      quantity: z.coerce
        .number()
        .gte(1, { message: "qty >= 1" })
        .lte(99, { message: "qty <= 99" }),
      price: z.coerce
        .number()
        .gte(1, { message: "price >= 1" })
        .lte(99999, { message: "price <= 99,999" }),
    })
    .array(),
});
