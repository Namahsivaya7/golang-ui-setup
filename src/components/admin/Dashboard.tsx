// import { Box, Button, Card, Tab, Tabs, Typography } from "@mui/material";
// import { useNavigate } from "@tanstack/react-router";
// import React, { useEffect, useState } from "react";
// import {
//   Dashboard as DashboardIcon,
//   People,
//   Logout,
// } from "@mui/icons-material";
// import RFTextField from "../RFTextField";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// // ----------------------------------------
// interface User {
//   ID: number;
//   name: string;
//   email: string;
//   role: string;
//   isVerified: boolean;
// }

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// function a11yProps(index: number) {
//   return {
//     id: `vertical-tab-${index}`,
//     "aria-controls": `vertical-tabpanel-${index}`,
//   };
// }

// // ============================================

// export default function Dashboard() {
//   const [tabValue, setTabValue] = useState(0);

//   const navigate = useNavigate();
//   const notify = () => toast.success("Verification link sent");
//   const handleTabChange = (e: React.SyntheticEvent, value: number) => {
//     setTabValue(value);
//   };
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("admin_data");
//     navigate({ to: "/auth/signin" });
//   };

//   const adminData = localStorage.getItem("admin_data");
//   const admin = adminData ? JSON.parse(adminData) : null;

//   // -----------------------------

//   const [users, setUsers] = useState<User[]>([]);
//   const [verifiedUsers, setVerifiedUsers] = useState<User[]>([]);
//   const [email, setEmail] = useState("");
//   const token = localStorage.getItem("token");

//   const getUsers = async () => {
//     try {
//       const responce = await fetch("http://localhost:8080/getusers", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("users responce:", responce);
//       if (!responce.ok) {
//         throw new Error("unable to fetch users");
//       }
//       const res: User[] = await responce.json();
//       setUsers(res);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getUsers();
//   }, []);

//   console.log("users", users);

//   const getVerifiedUsers = async () => {
//     const responce = await fetch("http://localhost:8080/users/verified", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     // console.log("get verfied users",responce);

//     if (!responce.ok) {
//       throw new Error("Unable to fetch unverified users");
//     }
//     const res: User[] = await responce.json();
//     setVerifiedUsers(res);
//   };
//   console.log("get verfied users", verifiedUsers);

//   useEffect(() => {
//     getVerifiedUsers();
//   }, []);

//   const sendVerifyLink = async (e?: React.FormEvent<HTMLFormElement>) => {
//     e?.preventDefault();
//     try {
//       const responce = await fetch("http://localhost:8080/create-user", {
//         method: "POST",
//         body: JSON.stringify({ email }),
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!responce.ok) {
//         throw new Error(" Error while creating new user");
//       }
//       const res = await responce.json();
//       setEmail("");
//       await notify();
//       console.log("responce", res);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   // ===================================

//   return (
//     <div className="bg-gray-50">
//       <header className="bg-white shadow-sm border-b">
//         <div className="px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
//             </div>

//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-3">
//                 <div className="hidden sm:block">
//                   <p className="text-sm font-medium text-gray-800">
//                     {admin?.name || "Admin"}
//                   </p>
//                   <p className="text-xs text-gray-500">Administrator</p>
//                 </div>
//                 <Button
//                   variant="text"
//                   className="text-gray-600"
//                   onClick={handleLogout}
//                 >
//                   <Logout />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="flex">
//         <aside className="w-64 bg-white shadow-sm h-[calc(100vh-80px)] sticky top-0 hidden md:block">
//           <nav className="p-4 space-y-2">
//             <Box sx={{ width: "100%" }}>
//               <Tabs
//                 value={tabValue}
//                 onChange={handleTabChange}
//                 orientation="vertical"
//                 textColor="secondary"
//                 indicatorColor="secondary"
//                 aria-label="secondary tabs example"
//               >
//                 <Tab label="Dashboard" {...a11yProps(0)} />
//                 <Tab label="Add User" {...a11yProps(1)} />
//                 <Tab label="Users" {...a11yProps(2)} />
//                 <Tab label="Verified Users" {...a11yProps(3)} />
//               </Tabs>
//             </Box>
//           </nav>
//         </aside>

//         <main className="flex-1 p-4">
//           <div className="mb-8">
//             <TabPanel index={0} value={tabValue}>
//               <h2 className="text-2xl font-semibold text-gray-800 mb-2">
//                 Welcome back, {admin?.name || "Admin"}
//               </h2>
//               <p className="text-gray-600">Here's what's happening today.</p>
//             </TabPanel>
//             <TabPanel index={1} value={tabValue}>
//               <Box
//                 component="form"
//                 onSubmit={sendVerifyLink}
//                 className="w-full flex justify-center items-center h-full"
//               >
//                 <div className="w-100 flex flex-col justify-center gap-5">
//                   <Typography variant="h5">Add User</Typography>
//                   <ToastContainer />
//                   <RFTextField
//                     label="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-100"
//                   />
//                   <Button type="submit" variant="contained" className="">
//                     Send verify link
//                   </Button>
//                 </div>
//               </Box>
//             </TabPanel>
//             <TabPanel index={2} value={tabValue}>
//               {/* <Card> */}
//               {users?.map((user) => (
//                 <Card style={{ padding: 5, margin: 7 }}>
//                   <p key={user.ID}>
//                     <p>User ID: {user.ID}</p>
//                     <strong>Email: </strong>
//                     {user.email}
//                   </p>
//                   <p>
//                     <strong>Verified: </strong>
//                     <span style={{ color: user.isVerified ? "green" : "red" }}>
//                       {user.isVerified ? "Verified" : "Not verified"}
//                     </span>
//                   </p>
//                 </Card>
//               ))}
//               {/* </Card> */}
//             </TabPanel>
//             <TabPanel index={3} value={tabValue}>
//               <Typography
//                 className="flex justify-center font-large !mb-10"
//                 variant="h5"
//               >
//                 Verified Users
//               </Typography>
//               {verifiedUsers.length > 0 ? (
//                 verifiedUsers.map((user) => (
//                   <Card className="p-2">
//                     <Typography key={user.ID}>
//                       <strong>Email: </strong> {user.email}
//                     </Typography>
//                   </Card>
//                 ))
//               ) : (
//                 <Typography color="text.secondary">
//                   No verified users found
//                 </Typography>
//               )}
//             </TabPanel>
//           </div>
//         </main>
//       </div>

//       {/* Mobile Bottom Navigation */}
//       <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t w-full">
//         <div className="flex justify-around p-1">
//           <Button variant="text" className="text-blue-600">
//             <DashboardIcon />
//           </Button>
//           <Button variant="text" className="text-gray-600">
//             <People />
//           </Button>

//           <Button
//             variant="text"
//             className="text-gray-600"
//             onClick={handleLogout}
//           >
//             <Logout />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }


// -----------------------------------------------------------------------
// Without using RFTextField

// "use client";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "@tanstack/react-router";
// import {  
//   Card, 
//   CardContent 
// } from "../ui/card";
// import { 
//   Tabs, 
//   TabsList, 
//   TabsTrigger, 
//   TabsContent 
// } from "../ui/tabs";
// import { Input } from "../ui/input";

// import { LayoutDashboardIcon, LogOut } from "lucide-react";
// import { useSonner } from "sonner";
// import { Button } from "../ui/button";
// import { PeopleOutline } from "@mui/icons-material";

// interface User {
//   ID: number;
//   name: string;
//   email: string;
//   role: string;
//   isVerified: boolean;
// }

// export default function Dashboard() {
//   const [tabValue, setTabValue] = useState("dashboard");
//   const [users, setUsers] = useState<User[]>([]);
//   const [verifiedUsers, setVerifiedUsers] = useState<User[]>([]);
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();
//   const { sonner } = useSonner();
//   const token = localStorage.getItem("token");
//   const adminData = localStorage.getItem("admin_data");
//   const admin = adminData ? JSON.parse(adminData) : null;

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("admin_data");
//     navigate({ to: "/auth/signin" });
//   };

//   const getUsers = async () => {
//     try {
//       const res = await fetch("http://localhost:8080/getusers", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!res.ok) throw new Error("Failed to fetch users");
//       const data: User[] = await res.json();
//       setUsers(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getVerifiedUsers = async () => {
//     try {
//       const res = await fetch("http://localhost:8080/users/verified", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!res.ok) throw new Error("Failed to fetch verified users");
//       const data: User[] = await res.json();
//       setVerifiedUsers(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getUsers();
//     getVerifiedUsers();
//   }, []);

//   const sendVerifyLink = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:8080/create-user", {
//         method: "POST",
//         body: JSON.stringify({ email }),
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) throw new Error("Failed to create user");
//       setEmail("");
//       sonner({
//         title: "Success!",
//         description: "Verification link sent successfully.",
//       });
//     } catch (error) {
//       console.error(error);
//       sonner({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to send verification link.",
//       });
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Header */}
//       <header className="bg-white border-b shadow-sm">
//         <div className="flex justify-between items-center px-6 py-4">
//           <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
//           <div className="flex items-center space-x-4">
//             <div className="hidden sm:block text-right">
//               <p className="font-medium text-gray-800">
//                 {admin?.name || "Admin"}
//               </p>
//              {admin && <p className="text-xs text-gray-500">Administrator</p>}
//             </div>
//             <Button variant="ghost" onClick={handleLogout}>
//               <LogOut className="mr-2 h-4 w-4" /> Logout
//             </Button>
//           </div>
//         </div>
//       </header>

//       <div className="flex">
//         {/* Sidebar */}
//         <aside className="hidden md:block w-64 bg-white border-r h-[calc(100vh-80px)]">
//           <Tabs
//             orientation="vertical"
//             value={tabValue}
//             onValueChange={setTabValue}
//             className="p-4"
//           >
//             <TabsList className="flex flex-col mt-20 space-y-2">
//               <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
//               <TabsTrigger value="add-user">Add User</TabsTrigger>
//               <TabsTrigger value="users">Users</TabsTrigger>
//               <TabsTrigger value="verified">Verified Users</TabsTrigger>
//             </TabsList>
//           </Tabs>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-6">
//           <Tabs value={tabValue} onValueChange={setTabValue}>
//             {/* Dashboard */}
//             <TabsContent value="dashboard">
//               <h3 className="text-xl font-semibold mb-2">
//                 Welcome back, {admin?.name || "Admin"}
//               </h3>
//               <p className="text-gray-600">
//                 Here’s what’s happening today.
//               </p>
//             </TabsContent>

//             {/* Add User */}
//             <TabsContent value="add-user">
//               <Card className="max-w-md mx-auto p-6">
//                 <form onSubmit={sendVerifyLink} className="space-y-4">
//                   <h4 className="text-lg font-semibold">Add New User</h4>
//                   <Input
//                     type="email"
//                     placeholder="Enter email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                   <Button type="submit" variant="default" className="w-full text-black">
//                     Send Verification Link
//                   </Button>
//                 </form>
//               </Card>
//             </TabsContent>

//             {/* Users */}
//             <TabsContent value="users">
//               <h4 className="text-lg font-semibold mb-4">All Users</h4>
//               <div className="space-y-3">
//                 {users.map((user) => (
//                   <Card key={user.ID}>
//                     <CardContent className="p-4">
//                       <p><strong>Email:</strong> {user.email}</p>
//                       <p>
//                         <strong>Status:</strong>{" "}
//                         <span
//                           className={
//                             user.isVerified ? "text-green-600" : "text-red-600"
//                           }
//                         >
//                           {user.isVerified ? "Verified" : "Not Verified"}
//                         </span>
//                       </p>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </TabsContent>

//             {/* Verified Users */}
//             <TabsContent value="verified">
//               <h4 className="text-lg font-semibold mb-4 text-center">
//                 Verified Users
//               </h4>
//               {verifiedUsers.length > 0 ? (
//                 verifiedUsers.map((user) => (
//                   <Card key={user.ID} className="p-2 mb-2">
//                     <CardContent>
//                       <p><strong>Email:</strong> {user.email}</p>
//                     </CardContent>
//                   </Card>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500">
//                   No verified users found.
//                 </p>
//               )}
//             </TabsContent>
//           </Tabs>
//         </main>
//       </div>

//       {/* Mobile Bottom Nav */}
//       <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t w-full">
//         <div className="flex justify-around p-2">
//           <Button variant="ghost" onClick={() => setTabValue("dashboard")}>
//             <LayoutDashboardIcon className="h-5 w-5" />
//           </Button>
//           <Button variant="ghost" onClick={() => setTabValue("users")}>
//             <PeopleOutline className="h-5 w-5" />
//           </Button>
//           <Button variant="ghost" onClick={handleLogout}>
//             <LogOut className="h-5 w-5" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
// =============================================================================

"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";

import RFTextField from "../RFTextField";

interface User {
  ID: number;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
}

// ✅ Define schema with Zod
const addUserSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export default function Dashboard() {
  const [tabValue, setTabValue] = useState("dashboard");
  const [users, setUsers] = useState<User[]>([]);
  const [verifiedUsers, setVerifiedUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const adminData = localStorage.getItem("admin_data");
  const admin = adminData ? JSON.parse(adminData) : null;

  // ✅ Initialize form
  const form = useForm<z.infer<typeof addUserSchema>>({
    resolver: zodResolver(addUserSchema),
    defaultValues: { email: "" },
  });

  // ✅ Submit handler
  const onSubmit = async (data: z.infer<typeof addUserSchema>) => {
    try {
      const res = await fetch("http://localhost:8080/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create user");

      form.reset();
     toast.success("Verification link sent successfully!");
    } catch (error) {
      console.error(error);
     toast.error("Failed to send verification link.");
    }
  };

  // ✅ Fetch users
  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:8080/getusers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data: User[] = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getVerifiedUsers = async () => {
    try {
      const res = await fetch("http://localhost:8080/users/verified", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch verified users");
      const data: User[] = await res.json();
      setVerifiedUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
    getVerifiedUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin_data");
    navigate({ to: "/auth/signin" });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="flex justify-between items-center px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-right">
              <p className="font-medium text-gray-800">{admin?.name || "Admin"}</p>
              {admin && <p className="text-xs text-gray-500">Administrator</p>}
            </div>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white border-r h-[calc(100vh-80px)]">
          <Tabs
            orientation="vertical"
            value={tabValue}
            onValueChange={setTabValue}
            className="p-4"
          >
            <TabsList className="flex flex-col mt-20 space-y-2">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="add-user">Add User</TabsTrigger>
              <TabsTrigger value="users">All Users</TabsTrigger>
              <TabsTrigger value="verified">Verified Users</TabsTrigger>
            </TabsList>
          </Tabs>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Tabs value={tabValue} onValueChange={setTabValue}>
            {/* Dashboard */}
            <TabsContent value="dashboard">
              <h3 className="text-xl font-semibold mb-2">
                Welcome back, {admin?.name || "Admin"}
              </h3>
              <p className="text-gray-600">Here’s what’s happening today.</p>
            </TabsContent>

            {/* Add User */}
            <TabsContent value="add-user">
              <Card className="max-w-md mx-auto p-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold">Add New User</h4>

                    {/* ✅ Use your reusable RFTextField */}
                    <RFTextField
                      name="email"
                      label="Email"
                      placeholder="Enter user email"
                      type="email"
                    />

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Send Verification Link
                    </Button>
                  </form>
                </Form>
              </Card>
            </TabsContent>

            {/* Users */}
            <TabsContent value="users">
              <h4 className="text-lg font-semibold mb-4">All Users</h4>
              <div className="space-y-3">
                {users.map((user) => (
                  <Card key={user.ID}>
                    <CardContent className="p-4">
                      <p>User Id: {user.ID}</p>
                      <p>
                        <strong>Email:</strong> {user.email}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        <span
                          className={
                            user.isVerified ? "text-green-600" : "text-red-600"
                          }
                        >
                          {user.isVerified ? "Verified" : "Not Verified"}
                        </span>
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Verified Users */}
            <TabsContent value="verified">
              <h4 className="text-lg font-semibold mb-4 text-center">
                Verified Users
              </h4>
              {verifiedUsers.length > 0 ? (
                verifiedUsers.map((user) => (
                  <Card key={user.ID} className="p-2 mb-2">
                    <CardContent>
                      <p>
                        <strong>Email:</strong> {user.email}
                      </p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No verified users found.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
