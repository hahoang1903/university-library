"use client";

import AuthForm from "@/components/form/AuthForm";
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
    onSubmit={async (data) => {
      console.log(data);
      return { success: true };
    }}
  />
);

export default SignUpPage;
