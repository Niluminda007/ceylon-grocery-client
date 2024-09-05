// "use client";

// import { useEffect, useState, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { CustomerInfoSchema } from "@/schemas/customer-info-schema";

// import * as z from "zod";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { FormError } from "@/components/form-error";
// import { FormSuccess } from "@/components/form-success";
// import { useRouter } from "next/navigation";
// import useCheckOut from "@/hooks/use-checkout";
// import { UserDTO } from "@/types/user";

// interface ReviewInfoFormProps {
//   user: UserDTO;
// }

// const ReviewInfoForm = ({ user }: ReviewInfoFormProps) => {
//   const { data, setData, setStage, completeStage } = useCheckOut((state) => ({
//     data: state.data,
//     setData: state.setData,
//     completeStage: state.completeStage,
//     setStage: state.setStage,
//   }));
//   const form = useForm({
//     resolver: zodResolver(CustomerInfoSchema),
//     defaultValues: {
//       email: user.email,
//       telephone: user.telephone || "",
//       firstName: user.name || "",
//       lastName: "",
//       address: user.address || "",
//       apartment: "",
//       city: user.city || "",
//       postalCode: "",
//       ...data.info,
//     },
//   });

//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//     watch,
//   } = form;
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | undefined>("");
//   const [success, setSuccess] = useState<string | undefined>("");
//   const router = useRouter();

//   const onSubmit = (data: z.infer<typeof CustomerInfoSchema>) => {
//     setError("");
//     setSuccess("");
//     setData({ info: data });
//     completeStage("info");
//     router.push("/checkout/delivery");
//   };

//   useEffect(() => {
//     setStage("info");
//   }, [setStage]);

//   useEffect(() => {
//     const subscription = watch((formData) => {
//       setData({ info: formData as z.infer<typeof CustomerInfoSchema> });
//     });
//     return () => subscription.unsubscribe();
//   }, [watch, setData]);

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-neutral-700 text-2xl font-bold mb-6">
//         Review Your Contact and Delivery Information
//       </h2>
//       <Form {...form}>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <FormField
//               control={control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={isPending}
//                       {...field}
//                       placeholder="john.doe@mail.com"
//                       type="email"
//                       autoComplete="email"
//                       className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name="telephone"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Telephone</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={isPending}
//                       {...field}
//                       placeholder="(123) 456-7890"
//                       autoComplete="tel"
//                       className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name="firstName"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>First Name</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={isPending}
//                       {...field}
//                       placeholder="John"
//                       autoComplete="given-name"
//                       className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name="lastName"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Last Name</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={isPending}
//                       {...field}
//                       placeholder="Doe"
//                       autoComplete="family-name"
//                       className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name="address"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Address</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={isPending}
//                       {...field}
//                       placeholder="123 Main St"
//                       autoComplete="street-address"
//                       className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name="apartment"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Apartment, suite, etc</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={isPending}
//                       {...field}
//                       placeholder="Apt 1B"
//                       autoComplete="address-line2"
//                       className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name="city"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>City</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={isPending}
//                       {...field}
//                       placeholder="New York"
//                       autoComplete="address-level2"
//                       className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name="postalCode"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Postal Code</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={isPending}
//                       {...field}
//                       placeholder="10001"
//                       autoComplete="postal-code"
//                       className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <FormError message={error} />
//           <FormSuccess message={success} />
//           <Button
//             type="submit"
//             className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
//             disabled={isPending}
//           >
//             {isPending ? "Submitting..." : "Next"}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default ReviewInfoForm;
