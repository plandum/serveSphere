import * as z from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import Loader from "@/components/shared/Loader.tsx";
import { useToast } from "@/components/ui/use-toast.ts";

import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queries.ts";
import { SignupValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext.tsx";

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      fullName: "",
      //lastName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // Queries
  const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isLoading: isSigningInUser } = useSignInAccount();

  // Handler
  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
    try {
      const newUser = await createUserAccount(user);

      if (!newUser) {
        toast({ title: "Sign up failed. Please try again.", });
        
        return;
      }

      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        toast({ title: "Something went wrong. Please login your new account", });
        
        navigate("/sign-in");
        
        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        navigate("/");
      } else {
        toast({ title: "Login failed. Please try again.", });
        
        return;
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSignup)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md"
      >
        {/* First Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter first name" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* Last Name */}
        {/*<FormField*/}
        {/*  control={form.control}*/}
        {/*  name="lastName"*/}
        {/*  render={({ field }) => (*/}
        {/*    <FormItem>*/}
        {/*      <FormLabel className="shad-form_label">Last Name</FormLabel>*/}
        {/*      <FormControl>*/}
        {/*        <Input placeholder="Enter last name" className="shad-input" {...field} />*/}
        {/*      </FormControl>*/}
        {/*      <FormMessage className="shad-form_message" />*/}
        {/*    </FormItem>*/}
        {/*  )}*/}
        {/*/>*/}

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Phone</FormLabel>
              <FormControl>
                <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm select-none">
            +1
          </span>
                  <Input
                    type="tel"
                    placeholder="8184567890"
                    className="shad-input pl-10"
                    value={field.value || ""}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                      field.onChange(digits);
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="shad-input pr-10"
                    {...field}
                  />
                  <div
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        {/*<FormField*/}
        {/*  control={form.control}*/}
        {/*  name="confirmPassword"*/}
        {/*  render={({ field }) => (*/}
        {/*    <FormItem>*/}
        {/*      <FormLabel className="shad-form_label">Confirm Password</FormLabel>*/}
        {/*      <FormControl>*/}
        {/*        <div className="relative">*/}
        {/*          <Input*/}
        {/*            type={showConfirmPassword ? "text" : "password"}*/}
        {/*            placeholder="Repeat password"*/}
        {/*            className="shad-input pr-10"*/}
        {/*            {...field}*/}
        {/*          />*/}
        {/*          <div*/}
        {/*            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"*/}
        {/*            onClick={() => setShowConfirmPassword((prev) => !prev)}*/}
        {/*          >*/}
        {/*            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </FormControl>*/}
        {/*      <FormMessage className="shad-form_message" />*/}
        {/*    </FormItem>*/}
        {/*  )}*/}
        {/*/>*/}

        {/* Кнопки — на всю ширину одной колонки */}
        <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-4">
          <Button type="button" variant="ghost" className="shad-button_ghost" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" className="shad-button_primary">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
