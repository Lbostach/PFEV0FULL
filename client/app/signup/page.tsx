"use client"
import { useRouter } from "next/navigation";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
 

const formSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
})

export default function SignupPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName:"",
      lastName:"",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const { firstName: firstName, lastName: lastName,email: email, password: password } = values;
    
    console.log(values);
  try {
    const response = await fetch("http://localhost:3001/Api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({firstName,lastName,email,password}),
    });

    

    if (!response.ok) {
      throw new Error("Sign up failed");
    }
   const values = await response.json();

   localStorage.setItem("token", values.token);
   console.log(values);
   
  alert('Sign up successful! Redirecting to login page.');
  router.push('/login');

  } catch (error) {
    console.log("error");
    alert("Email Already exists! Please try again with a different email.");
  }
  }
  

  return (
    /* Standard Sign up form */
    <div className="flex items-center min-h-screen p-6">
      <div className="mx-auto w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden md:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter the required information to sign up.
            </CardDescription>
          </CardHeader>
          <CardContent>
          <Form {...form}>
            <form
              
              className="space-y-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
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
                      <Input placeholder="ab@example.com" {...field} />
                    </FormControl>
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
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <Link href="/login" className="underline mx-1">
              Log in
            </Link>
          </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
