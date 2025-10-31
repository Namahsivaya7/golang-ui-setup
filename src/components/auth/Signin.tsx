// import {
//   Box,
//   Button,
//   IconButton,
//   InputAdornment,
//   Typography,
//   Paper,
//   Container,
//   Alert,
//   CircularProgress,
// } from "@mui/material";
// import React, { useState } from "react";
// import RFTextField from "../RFTextField";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { useNavigate } from "@tanstack/react-router";
// import { LockPerson, AdminPanelSettings } from "@mui/icons-material";

// interface Errors {
//   email?: string;
//   password?: string;
// }

// export default function Signin() {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState<Errors>({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();

//   const validate = () => {
//     const newErrors: Errors = {};
//     if (!email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Email is invalid";
//     }
//     if (!password) {
//       newErrors.password = "Password is required";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }
//     return newErrors;
//   };

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const validateErrors = validate();

//     if (Object.keys(validateErrors).length > 0) {
//       setErrors(validateErrors);
//       return;
//     }

//     setIsLoading(true);
//     setErrors({});

//     try {
//       const res = await fetch("http://localhost:8080/admin/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setErrors({
//           email: data.error || "Invalid credentials",
//           password: data.error || "Invalid credentials",
//         });
//         return;
//       }

//       // Save token to localStorage for future API calls
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("admin_data", JSON.stringify(data?.admin));
//       console.log("Is admin", data?.admin.role);

//       if (data.admin.role === "Admin") navigate({ to: "/dashboard" });
//     } catch (error) {
//       console.error("Login failed", error);
//       setErrors({ email: "Network error. Please try again." });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
//       <div className="absolute inset-0 bg-black/20">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:40px_40px]"></div>
//       </div>

//       <Container
//         component="main"
//         className="relative min-h-screen flex items-center justify-center p-4"
//       >
//         <div className="flex-1 max-w-md w-full">
//           <Paper
//             elevation={24}
//             className="p-8 sm:p-10 backdrop-blur-sm bg-white/95 rounded-2xl border border-white/20 shadow-2xl"
//           >
//             <div className="text-center mb-8">
//               <div className="flex justify-center mb-4">
//                 <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
//                   <LockPerson className="text-white text-3xl" />
//                 </div>
//               </div>
//               <Typography variant="h4" className="font-bold text-gray-900 mb-2">
//                 Welcome Back
//               </Typography>
//               <Typography variant="body2" className="text-gray-600">
//                 Sign in to your admin dashboard
//               </Typography>
//             </div>

//             {(errors.email || errors.password) && (
//               <Alert severity="error" className="mb-6 rounded-xl">
//                 {errors.email || errors.password}
//               </Alert>
//             )}

//             <Box component="form" onSubmit={handleLogin} className="space-y-6">
//               <div>
//                 <RFTextField
//                   fullWidth
//                   type="email"
//                   label="Email Address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   error={!!errors.email}
//                   helperText={errors.email}
//                   disabled={isLoading}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <AdminPanelSettings className="text-gray-400" />
//                       </InputAdornment>
//                     ),
//                   }}
//                   className="rounded-xl"
//                 />
//               </div>

//               <div>
//                 <RFTextField
//                   type={showPassword ? "text" : "password"}
//                   label="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   error={!!errors.password}
//                   helperText={errors.password}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LockPerson className="text-gray-400" />
//                       </InputAdornment>
//                     ),
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           onClick={() => setShowPassword(!showPassword)}
//                           edge="end"
//                           disabled={isLoading}
//                         >
//                           {showPassword ? (
//                             <VisibilityOffIcon />
//                           ) : (
//                             <VisibilityIcon />
//                           )}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </div>

//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 disabled={isLoading}
//                 className="h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
//               >
//                 {isLoading ? (
//                   <CircularProgress size={24} className="text-white" />
//                 ) : (
//                   <Typography className="font-semibold">Sign In</Typography>
//                 )}
//               </Button>
//             </Box>
//           </Paper>
//         </div>
//       </Container>
//     </div>
//   );
// }

// ------------------------------------------------------------------------

// using shadcn,RFTextField
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Loader2, Lock } from "lucide-react";
import RFTextField from "../../components/RFTextField";

const signinSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SigninFormValues = z.infer<typeof signinSchema>;

export default function Signin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SigninFormValues) => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8080/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Invalid credentials");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("admin_data", JSON.stringify(data?.admin));
      toast.success("Login successful!");

      if (data.admin.role === "Admin") navigate({ to: "/dashboard" });
    } catch (error) {
      console.error(error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-4">
      <Card className="w-full max-w-md backdrop-blur-md bg-white/95 shadow-2xl border border-white/20 rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Lock className="text-white h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Welcome Back
          </CardTitle>
          <p className="text-sm text-gray-500">
            Sign in to your admin dashboard
          </p>
        </CardHeader>

        <CardContent>
          {/* <Form {...form}>
            {/* <FormProvider {...form}> */}
          {/* <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 mt-4"
              >
                <RFTextField
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />

                <RFTextField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />

                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-md transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            {/* </FormProvider> */}
          {/* </Form>  */}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 mt-4"
            >
              <RFTextField
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                disabled={isLoading}
              />

              <RFTextField
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                disabled={isLoading}
              />

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-md transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
