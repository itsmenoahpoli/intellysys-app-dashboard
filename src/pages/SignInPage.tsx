import { AuthLayout, LoginForm } from "@/components";
import { Helmet } from "react-helmet-async";

export default function SignInPage() {
  return (
    <>
      <Helmet>
        <title>Sign in · WAP INTELLYSYS</title>
        <meta
          name="description"
          content="Sign in to WAP INTELLYSIS to access your workspace."
        />
      </Helmet>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </>
  );
}
