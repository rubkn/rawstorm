"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  /* username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long." })
    .max(24, { message: "Username must be less than 24 characters." }), */
  email: z.string().email({ message: "Please enter a valid email address." }),
  /*   fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters long." }), */
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export default function SignupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      /* username: "", */
      email: "",
      /* fullName: "", */
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">
          Sign up to capture and share your best shots!
        </h1>
        <p className="text-zinc-400">
          Become part of a passionate photography community. Sign up now to
          showcase your creativity and discover new inspirations.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••" type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /> */}

          <Button type="submit" className="w-full">
            Sign up with Email
          </Button>
        </form>
      </Form>

      <div className="text-sm">
        Already have an account?{" "}
        <Link href="/" className="font-semibold hover:underline">
          Log in
        </Link>
      </div>
    </div>
  );
}
