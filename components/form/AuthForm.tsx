"use client";

import type {
  DefaultValues,
  FieldValues,
  Path,
  PathValue,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { type ZodType } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useRouter } from "@/i18n/navigation";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "./ImageUpload";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Props<T extends FieldValues> = {
  type: "SIGN_IN" | "SIGN_UP";
  schema: ZodType<T>;
  defaultValues: DefaultValues<T>;
  submitAction: (data: T) => Promise<{ success: boolean; message: string }>;
};

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  submitAction,
}: Props<T>) => {
  const isSignIn = type === "SIGN_IN";
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const { toast } = useToast();
  const router = useRouter();
  const locale = useLocale();
  const [isAllowSubmit, setIsAllowSubmit] = useState(true);
  const { data: session, update } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/", { locale });
    }
  }, [locale, router, session]);

  const handleSubmit: SubmitHandler<T> = async (data) => {
    try {
      setIsAllowSubmit(false);
      const { success, message } = await submitAction(data);
      toast({
        title: success ? "Welcome" : "Error",
        description: message,
        variant: success ? "default" : "destructive",
      });
      if (success) {
        // broadcast the session to all tabs and the useEffect will handle the redirect
        await update();
      } else {
        setIsAllowSubmit(true);
      }
    } catch {
      toast({
        title: "Network error",
        description: "You are offline. Please check your connection",
        variant: "destructive",
      });
      setIsAllowSubmit(true);
    }
  };

  const handleImageChange = (file: File | undefined) => {
    form.setValue("universityCard" as Path<T>, file as PathValue<T, Path<T>>);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "Welcome back to BookWise" : "Create your library account"}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID card to gain access to the library"}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <ImageUpload handleImageChange={handleImageChange} />
                    ) : (
                      <Input
                        className="form-input"
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="form-btn" disabled={!isAllowSubmit}>
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {isSignIn ? "New to BookWise?" : "Already have an account?"}{" "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary"
        >
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
