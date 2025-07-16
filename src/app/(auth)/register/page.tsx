'use client'
import React from 'react'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {
  Form, 
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const formSchema = z.object({
  username: z.string()
        .min(8, {
        message: "Username must be at least 8 characters.",
  })
        .max(20, {
        message: "Username must be at most 20 characters.",
    }),
    email: z.string()
        .email({
        message: "Invalid email address.",
    })
     ,
    password: z.string()
        .min(8, {
        message: "Password must be at least 8 characters.",
    })
       .regex(passwordRegex,{
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
    confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword,{
        message: "Passwords do not match.",
        path: ["confirmPassword"],// show error on confirmPassword field
    })

export default function RegisterForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }
    
  return (
   <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-10">
       
        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Strong password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Repeat password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
