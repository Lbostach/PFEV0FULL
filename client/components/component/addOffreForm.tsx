import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    Card,
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";

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
    titre: z.string().min(3),
    description: z.string().min(30),
    prerequis: z.string().min(10),
    niveauEtude: z.string().min(3),
    domaine: z.string().min(3),
  })

  interface AddOffreFormProps {
    idRecruteur: string;
  }

export function AddOffreForm({ idRecruteur }: AddOffreFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titre: "",
      description: "",
      prerequis: "",
      niveauEtude: "",
      domaine: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const {
      titre: titre,
      description: description,
      prerequis: prerequis,
      niveauEtude: niveauEtude,
      domaine: domaine,
    } = values;

    
    const data = {
      ...values,
      idRecruteur: idRecruteur,
    };
    console.log(data);
    try {
      const response = await fetch("http://localhost:3001/Api/offres", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("POST error");
      }
      const values = await response.json();
      console.log(values);
      window.location.reload();
      
    } catch (error) {
      console.log("Ther was an error with the offer creation.");
    }
  }

  return (
    <Card>
    <Form {...form}>
            <form
              
              className="space-y-4 space-x-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="titre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prerequis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prérequis de l'offre </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="niveauEtude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Niveau d'étude requis</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="domaine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domaine</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-1/4">
                Publier
              </Button>
            </form>
          </Form>
          </Card>
  )
}
