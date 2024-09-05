"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { ContactSchema } from "@/schemas/contact-schema";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { toast } from "sonner";
import { FaEnvelope, FaPaperPlane, FaUser } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";

const ContactForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    mode: "onChange",
  });

  const contactMutation = useMutation({
    mutationKey: ["send-email"],
    mutationFn: (customerData: z.infer<typeof ContactSchema>) =>
      fetcher({
        url: "/emails/contact",
        method: "POST",
        data: { customerData },
      }),
    onError: (error: any) => {
      toast.error(error.message);
      setError("Something went wrong. Please try again later.");
    },
    onSuccess: () => {
      toast.success("Email sent successfully!");
      setSuccess("Your message has been sent. We'll get back to you soon.");
      setTimeout(() => setSuccess(undefined), 3000);
      form.reset();
    },
  });

  const { isDirty, isValid } = form.formState;

  const onSubmit = (values: z.infer<typeof ContactSchema>) => {
    startTransition(() => {
      if (isDirty && isValid) {
        contactMutation.mutate(values);
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-6 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    disabled={isPending || contactMutation.isPending}
                    {...field}
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your name"
                    className="pl-10 w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md"
                  />
                </div>
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    disabled={isPending || contactMutation.isPending}
                    {...field}
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="pl-10 w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md"
                  />
                </div>
              </FormControl>
              <FormMessage>{form.formState.errors.email?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <div className="relative">
                  <FaPaperPlane className="absolute left-3 top-5 -translate-y-1/2 text-gray-400" />
                  <Textarea
                    disabled={isPending || contactMutation.isPending}
                    {...field}
                    rows={5}
                    autoComplete="message"
                    placeholder="Write your message here..."
                    className="pl-10 w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md"
                  />
                </div>
              </FormControl>
              <FormMessage>
                {form.formState.errors.message?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
        <button
          type="submit"
          disabled={isPending || !isValid}
          className="w-full py-3 px-6 text-white bg-neutral-800 hover:bg-neutral-950 disabled:bg-gray-400 rounded-md shadow-sm transition-colors duration-200"
        >
          {isPending || contactMutation.isPending
            ? "Sending..."
            : "Send Message"}
        </button>
      </form>
    </Form>
  );
};

export default ContactForm;
