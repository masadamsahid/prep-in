"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) => z.object({
  name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
  email: z.string().email(),
  password: z.string().min(3),
});

type Props = {
  type: FormType;
};

const AuthForms = ({ type }: Props) => {
  const router = useRouter();

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if(type === "sign-up") {
        console.log("SIGN UP", values);
        toast.success("Account created successfully. Please sign-in");
        router.push("/sign-in");
      } else {
        console.log("SIGN IN", values);
        toast.success("Signed in successfully");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong. ERROR: ${error}`);
    }
  }

  const isSignIn = type === "sign-in";
  const title = isSignIn ? "Sign In" : "Sign Up";


  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" width={32} height={38} />
          <h2 className="text-primary-100">Prep-In</h2>
        </div>

        <h3>Practice job interviews with AI</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
            {!isSignIn && (
              <FormField control={form.control} name="name" label="Your Name" placeholder="John Doe"/>
            )}
            <FormField control={form.control} name="email" label="Email Address" type="email" placeholder="myemail@example.com"/>
            <FormField control={form.control} name="password" label="Password" type="password" placeholder="Password (8 to 20 characters)"/>
            <Button type="submit" className="btn">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>
        <p>
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="font-bold text-user-primary ml-1">
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthForms;