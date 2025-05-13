"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/header";
import { User } from "@/lib/types";

export default function Profile() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<User | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/signin");
    } else if (user) {
      setProfile(user);
    }
  }, [user, isLoading, router]);

  const handleSaveProfile = () => {
    if (!profile) return;
    
    setIsSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved.",
      });
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground mt-2">
              Manage your personal information
            </p>
          </div>

          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center mb-8">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" alt={profile.name} />
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{profile.name}</h3>
                    <p className="text-muted-foreground">{profile.email}</p>
                    <div className="mt-4">
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input
                      id="full-name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Signature</CardTitle>
                <CardDescription>
                  Customize how your signature appears on documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-md p-6 bg-muted/50">
                  <p className="text-sm font-medium mb-4">Current Signature</p>
                  <div className="h-24 border rounded bg-white flex items-center justify-center">
                    <span className="font-signature text-3xl text-blue-600">
                      {profile.name}
                    </span>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="signature-style">Signature Style</Label>
                    <select 
                      id="signature-style"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                    >
                      <option value="typed">Typed</option>
                      <option value="drawn">Drawn</option>
                      <option value="uploaded">Uploaded Image</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="signature-color">Signature Color</Label>
                    <div className="flex gap-4 mt-1">
                      <button className="w-8 h-8 rounded-full bg-blue-600 border-2 border-blue-600 ring-2 ring-offset-2 ring-offset-background ring-blue-200"></button>
                      <button className="w-8 h-8 rounded-full bg-black border-2 border-transparent"></button>
                      <button className="w-8 h-8 rounded-full bg-green-600 border-2 border-transparent"></button>
                      <button className="w-8 h-8 rounded-full bg-purple-600 border-2 border-transparent"></button>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="outline">
                    Draw New Signature
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button>
                  Save Signature
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}