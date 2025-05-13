"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/header";

export default function Settings() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [smtpSettings, setSmtpSettings] = useState({
    host: "",
    port: "",
    username: "",
    password: "",
    fromEmail: "",
    fromName: "",
    secure: true,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailOnRequest: true,
    emailOnSign: true,
    emailOnComplete: true,
    browserNotifications: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/signin");
    }
  }, [user, isLoading, router]);

  const handleSaveSmtpSettings = () => {
    setIsSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings saved",
        description: "Your email settings have been updated successfully.",
      });
    }, 1000);
  };

  const handleSaveNotificationSettings = () => {
    setIsSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings saved",
        description: "Your notification preferences have been updated successfully.",
      });
    }, 1000);
  };

  const handleTestConnection = () => {
    toast({
      title: "Test email sent",
      description: "A test email has been sent to verify your SMTP configuration.",
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your account and application preferences
            </p>
          </div>

          <Tabs defaultValue="email">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="email">Email Configuration</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Configuration</CardTitle>
                  <CardDescription>
                    Set up your email server for sending notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="smtp-host">SMTP Host</Label>
                        <Input
                          id="smtp-host"
                          placeholder="e.g. smtp.gmail.com"
                          value={smtpSettings.host}
                          onChange={(e) =>
                            setSmtpSettings({ ...smtpSettings, host: e.target.value })
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="smtp-port">SMTP Port</Label>
                        <Input
                          id="smtp-port"
                          placeholder="e.g. 587"
                          value={smtpSettings.port}
                          onChange={(e) =>
                            setSmtpSettings({ ...smtpSettings, port: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="smtp-username">SMTP Username</Label>
                        <Input
                          id="smtp-username"
                          placeholder="e.g. your@email.com"
                          value={smtpSettings.username}
                          onChange={(e) =>
                            setSmtpSettings({ ...smtpSettings, username: e.target.value })
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="smtp-password">SMTP Password</Label>
                        <Input
                          id="smtp-password"
                          type="password"
                          placeholder="Your password"
                          value={smtpSettings.password}
                          onChange={(e) =>
                            setSmtpSettings({ ...smtpSettings, password: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="from-email">From Email</Label>
                        <Input
                          id="from-email"
                          placeholder="e.g. notifications@yourdomain.com"
                          value={smtpSettings.fromEmail}
                          onChange={(e) =>
                            setSmtpSettings({ ...smtpSettings, fromEmail: e.target.value })
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="from-name">From Name</Label>
                        <Input
                          id="from-name"
                          placeholder="e.g. DocSign Notifications"
                          value={smtpSettings.fromName}
                          onChange={(e) =>
                            setSmtpSettings({ ...smtpSettings, fromName: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="secure"
                        checked={smtpSettings.secure}
                        onCheckedChange={(checked) =>
                          setSmtpSettings({ ...smtpSettings, secure: checked })
                        }
                      />
                      <Label htmlFor="secure">Use secure connection (SSL/TLS)</Label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleTestConnection}>
                    Test Connection
                  </Button>
                  <Button onClick={handleSaveSmtpSettings} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Settings"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-request">Signature Requests</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive an email when someone requests your signature
                            </p>
                          </div>
                          <Switch
                            id="email-request"
                            checked={notificationSettings.emailOnRequest}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({
                                ...notificationSettings,
                                emailOnRequest: checked,
                              })
                            }
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-sign">Document Signed</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive an email when someone signs your document
                            </p>
                          </div>
                          <Switch
                            id="email-sign"
                            checked={notificationSettings.emailOnSign}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({
                                ...notificationSettings,
                                emailOnSign: checked,
                              })
                            }
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-complete">Document Completed</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive an email when a document is fully signed by all parties
                            </p>
                          </div>
                          <Switch
                            id="email-complete"
                            checked={notificationSettings.emailOnComplete}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({
                                ...notificationSettings,
                                emailOnComplete: checked,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Browser Notifications</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="browser-notifications">Enable Browser Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications in your browser when you're using the app
                          </p>
                        </div>
                        <Switch
                          id="browser-notifications"
                          checked={notificationSettings.browserNotifications}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              browserNotifications: checked,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="ml-auto" 
                    onClick={handleSaveNotificationSettings}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save Preferences"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Password</h3>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input
                            id="current-password"
                            type="password"
                            placeholder="Enter your current password"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input
                            id="new-password"
                            type="password"
                            placeholder="Enter your new password"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirm your new password"
                          />
                        </div>
                        <Button className="w-full sm:w-auto">
                          Update Password
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                      <p className="text-muted-foreground mb-4">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                      <Button variant="outline">
                        Enable Two-Factor Authentication
                      </Button>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium text-destructive mb-4">Danger Zone</h3>
                      <p className="text-muted-foreground mb-4">
                        Permanently delete your account and all associated data.
                      </p>
                      <Button variant="destructive">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}