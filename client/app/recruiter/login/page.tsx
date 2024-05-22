"use client"
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
 
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export default function Page() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const { email: email, password: password } = values;
    
    console.log(values);
  try {
    const response = await fetch("http://localhost:3001/Api/recruteur/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email,password}),
    });

    

    if (!response.ok) {
      throw new Error("Login failed");
    }
   const values = await response.json();

   localStorage.setItem("token", values.token);
   localStorage.setItem("idRecruteur", values.recruteur);
   
   console.log(values);
   router.push('/recruiter/dashboard');
  

  } catch (error) {
    console.log("error");
    alert("Incorrect Credentials !");
  }
  }
  return (
    <div className="flex items-center min-h-screen p-6">
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
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
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
        </Card>
      </div>
    </div>
  );
}
