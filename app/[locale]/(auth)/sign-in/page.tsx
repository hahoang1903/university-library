"use client";

import AuthForm from "@/components/form/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validations";

const SignInPage = () => (
  <AuthForm
    type="SIGN_IN"
    schema={signInSchema}
    defaultValues={{
      email: "",
      password: "",
    }}
    submitAction={signInWithCredentials}
  />
);

export default SignInPage;
