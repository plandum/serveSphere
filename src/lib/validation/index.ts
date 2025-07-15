import * as z from "zod";

// ============================================================
// USER
// ============================================================
export const SignupValidation = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  //lastName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).regex(/^\(\d{3}\) \d{3}-\d{4}$/, { message: "Invalid phone number format." }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  //confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  //lastName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).regex(/^\(\d{3}\) \d{3}-\d{4}$/, { message: "Invalid phone number format." }),
  email: z.string().email(),
  bio: z.string(),
});

// ============================================================
// POST
// ============================================================
export const ProductValidation = z.object({
  productName: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
  productPrice: z.string(),
  productDescription: z.string().min(5, { message: "Minimum 5 characters."}).max(2200, { message: "Maximum 2200 characters." }),
  productCategory: z.string().min(1, { message: "Category is required" }),
  productFile: z.custom<File[]>(),
  location: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
});
