"use client";

import AuthForm from "@/components/form/AuthForm";
import { signInSchema } from "@/lib/validations";

const SignInPage = () => (
  <AuthForm
    type="SIGN_IN"
    schema={signInSchema}
    defaultValues={{
      email: "",
      password: "",
    }}
    onSubmit={async (data) => {
      console.log(data);
      return { success: true };
    }}
  />
);

export default SignInPage;
