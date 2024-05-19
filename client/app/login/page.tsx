"use client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";



const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Page() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const { email: email, password: password } = values;

    console.log(values);
    try {
      const response = await fetch("http://localhost:3001/Api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }
      const values = await response.json();

      localStorage.setItem("token", values.token);
      localStorage.setItem("idCandidat", values.candidat);

      console.log(values);
      router.push("/dashboard");
    } catch (error) {
      console.log("error");
      setErrorMessage('Incorrect Credentials !');
    }
  }
  const [errorMessage, setErrorMessage] = useState('');
  return (
    
    <div className="flex items-center min-h-screen p-6">
      {errorMessage && <div className="fixed my-2 inset-0 flex justify-center items-start">
        <div className="relative">
      <button className= "mx-1 my-1 absolute flex justify-items-start text-xs" onClick={() => setErrorMessage('')}>X</button>
      <Card className="p-4">
        
        <div className="mx-1/2">
        {errorMessage}
        </div>
        </Card>
        </div>
        </div>}
      <div className="mx-auto w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden md:max-w-md">
        <Card className="p-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold -mx-6">
            Vous êtes les bienvenus !
            </CardTitle>
            <CardDescription className="-mx-6">
              Entrer Votre Email et Mot de Passe Pour Se Connecter
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Valider
              </Button>
            </form>
          </Form>
          <div className="mt-4 my-4 text-center text-sm">
          Vous n'avez pas un compte ?
            <Link className="underline mx-1" href="/signup">
              S'inscrire
            </Link>
          </div>
          <Link
            className="text-sm flex items-center justify-center underline"
            href="/recruiter/login"
          >
            Êtes-vous un recruteur?
          </Link>
        </Card>
        <div className="text-sm flex items-center justify-center"></div>
      </div>
    </div>
  );
}
