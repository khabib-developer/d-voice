"use client";

import { Button } from "@/z_shared/ui/Buttons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/z_shared/ui/Form";
import { Input } from "@/z_shared/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createTranslator,
  Messages,
  NestedKeyOf,
  useTranslations,
} from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define the schema using zod
const formSchema = (t: ReturnType<typeof createTranslator<Messages>>) =>
  z.object({
    name: z.string().min(2, t("errorName")),
    email: z.string().email(t("errorEmail")),
    phone: z.string().optional(),
  });

export function ContactForm() {
  const t = useTranslations("contact");
  // Initialize the form with react-hook-form and zodResolver
  const form = useForm({
    resolver: zodResolver(formSchema(t)),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const [sent, setSent] = useState(false);

  const onSubmit = async (data: any) => {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    setSent(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="!mb-3">
              <FormLabel>{t("name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("name")} {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="!mb-3">
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input placeholder={t("email")} {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("phone")}</FormLabel>
              <FormControl>
                <Input placeholder={t("phone")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className={`dark:bg-white w-full dark:text-neutral-950 bg-black text-white rounded-3xl mt-5 ${
            sent ? "!bg-green-500" : ""
          }`}
          type="submit"
          disabled={sent}
        >
          {sent ? t("sent") : t("submit")}
        </Button>
      </form>
    </Form>
  );
}
