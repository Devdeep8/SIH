"use client"
import Link from "next/link";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Landmark } from "lucide-react";

// TypeScript interfaces for form data
interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginData>({ email: "", password: "" });
  const [registerData, setRegisterData] = useState<RegisterData>({ name: "", email: "", password: "" });
  const [error, setError] = useState<string>("");

  // Handle login
  const handleLogin = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user: RegisterData = JSON.parse(storedUser);
      if (user.email === loginData.email && user.password === loginData.password) {
        router.push("/explor");
      } else {
        setError("Invalid email or password");
      }
    } else {
      setError("No user found, please register first.");
    }
  };

  // Handle registration
  const handleRegister = () => {
    localStorage.setItem("user", JSON.stringify(registerData));
    router.push("/explor");
  };

  // Handle input changes
  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRegisterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1606066889831-35faf6fa6ff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')"
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/50 to-amber-800/50 backdrop-blur-sm z-10" />
      
      {/* Content */}
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md space-y-8">
          <div className="flex justify-center">
            <Link href="#" className="flex items-center space-x-2 text-white" prefetch={false}>
              <Landmark className="h-12 w-12" />
              <span className="text-4xl font-bold">{process.env.APP_NAME || 'HeriTech'}</span>
            </Link>
          </div>
          <Card className="bg-white/90 backdrop-blur-md shadow-xl">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-amber-100/80">
                <TabsTrigger value="login" className="data-[state=active]:bg-amber-200">Login</TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-amber-200">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-amber-800">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="m@example.com" 
                      className="bg-amber-50/50 border-amber-200"
                      value={loginData.email}
                      onChange={handleLoginChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-amber-800">Password</Label>
                      <Link
                        href="#"
                        className="text-xs text-amber-600 hover:text-amber-700 underline underline-offset-4"
                        prefetch={false}
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      className="bg-amber-50/50 border-amber-200"
                      value={loginData.password}
                      onChange={handleLoginChange}
                    />
                  </div>
                  {error && <p className="text-red-600">{error}</p>}
                </CardContent>
                <CardFooter>
                  <Button onClick={handleLogin} className="w-full bg-amber-600 hover:bg-amber-700 text-white">Login</Button>
                </CardFooter>
              </TabsContent>
              <TabsContent value="register">
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-amber-800">Name</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      className="bg-amber-50/50 border-amber-200"
                      value={registerData.name}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-amber-800">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="m@example.com" 
                      className="bg-amber-50/50 border-amber-200"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-amber-800">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      className="bg-amber-50/50 border-amber-200"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleRegister} className="w-full bg-amber-600 hover:bg-amber-700 text-white">Register</Button>
                </CardFooter>
              </TabsContent>
            </Tabs>
          </Card>
          <div className="text-center text-sm text-white">
            <p>
              Don't have an account?{" "}
              <Link href="#" className="text-amber-200 hover:text-amber-100 underline underline-offset-4" prefetch={false}>
                Register
              </Link>
            </p>
            <p className="mt-1">
              Already have an account?{" "}
              <Link href="#" className="text-amber-200 hover:text-amber-100 underline underline-offset-4" prefetch={false}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
