"use client";

import AuthForm from "@/components/form/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validations";

const SignUpPage = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      email: "",
      password: "",
      fullName: "",
      universityId: 0,
      universityCard: undefined,
    }}
    submitAction={signUp}
  />
);

export default SignUpPage;
