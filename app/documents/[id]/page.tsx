"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";
import { MOCK_DOCUMENTS, DocumentStatus, SignatureStatus } from "@/lib/types";
import { 
  FileText, 
  Download, 
  ChevronLeft, 
  Send, 
  Users, 
  History, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Mail,
  Plus,
  Pen
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import Image from "next/image";

export default function DocumentDetails() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { id } = useParams();
  const { toast } = useToast();
  const [documentId, setDocumentId] = useState<string>("");
  const [isSigningView, setIsSigningView] = useState(false);

  useEffect(() => {
    if (typeof id === 'string') {
      setDocumentId(id);
    } else if (Array.isArray(id) && id.length > 0) {
      setDocumentId(id[0]);
    }
  }, [id]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/signin");
    }
  }, [user, isLoading, router]);

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

  const document = MOCK_DOCUMENTS.find(doc => doc.id === documentId);

  if (!document) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-8">
          <div className="container">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Document Not Found</h3>
              <p className="text-muted-foreground mb-8">
                The document you're looking for doesn't exist or you don't have permission to view it.
              </p>
              <Button asChild>
                <Link href="/documents">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Documents
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const handleAddSigners = () => {
    toast({
      title: "Signers added",
      description: "Signers have been notified via email.",
    });
  };

  const handleSendReminder = () => {
    toast({
      title: "Reminder sent",
      description: "A reminder has been sent to pending signers.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Document downloaded",
      description: "The document has been downloaded to your device.",
    });
  };

  const handleSign = () => {
    setIsSigningView(false);
    toast({
      title: "Document signed",
      description: "Thank you! The document has been signed successfully.",
    });
  };

  const getStatusIcon = (status: DocumentStatus | SignatureStatus) => {
    switch (status) {
      case DocumentStatus.PENDING:
      case SignatureStatus.PENDING:
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case DocumentStatus.COMPLETED:
      case SignatureStatus.SIGNED:
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case DocumentStatus.DECLINED:
      case SignatureStatus.DECLINED:
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadgeClass = (status: DocumentStatus | SignatureStatus) => {
    const baseClasses = "inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold";
    switch (status) {
      case DocumentStatus.PENDING:
      case SignatureStatus.PENDING:
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300`;
      case DocumentStatus.COMPLETED:
      case SignatureStatus.SIGNED:
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`;
      case DocumentStatus.DECLINED:
      case SignatureStatus.DECLINED:
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300`;
      case DocumentStatus.DRAFT:
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300`;
      default:
        return baseClasses;
    }
  };

  const statusText = (status: DocumentStatus | SignatureStatus) => 
    status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          {!isSigningView ? (
            <>
              <Breadcrumb className="mb-6">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink as={Link} href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink as={Link} href="/documents">Documents</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{document.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon" asChild>
                    <Link href="/documents">
                      <ChevronLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                      {document.title}
                    </h1>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-muted-foreground">
                        Uploaded {formatDistanceToNow(document.createdAt, { addSuffix: true })}
                      </span>
                      <Badge variant="outline" className={getStatusBadgeClass(document.status)}>
                        {getStatusIcon(document.status)}
                        {statusText(document.status)}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  {document.status === DocumentStatus.PENDING && (
                    <Button onClick={handleSendReminder}>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Reminder
                    </Button>
                  )}
                  {document.status === DocumentStatus.DRAFT && (
                    <Button onClick={() => setIsSigningView(true)}>
                      <Send className="mr-2 h-4 w-4" />
                      Sign Document
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="overflow-hidden">
                    <CardHeader className="bg-muted px-6 py-4">
                      <CardTitle className="text-lg">Document Preview</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="relative aspect-[3/4] w-full bg-white flex items-center justify-center">
                        {/* Mock document preview */}
                        <Image
                          src="https://images.pexels.com/photos/4792282/pexels-photo-4792282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                          alt="Document preview"
                          style={{ objectFit: "contain" }}
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, 66vw"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-1">
                  <Tabs defaultValue="signers">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="signers">Signers</TabsTrigger>
                      <TabsTrigger value="history">History</TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="signers" className="mt-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle>Document Signers</CardTitle>
                          <CardDescription>
                            People who need to sign this document
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {document.signers.length > 0 ? (
                            <ScrollArea className="h-96">
                              <div className="space-y-4">
                                {document.signers.map((signer, index) => (
                                  <div
                                    key={signer.id}
                                    className="flex items-start p-3 rounded-md border"
                                  >
                                    <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                                      <Users className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="font-medium">
                                        {signer.name || signer.email}
                                      </p>
                                      {signer.name && (
                                        <p className="text-sm text-muted-foreground">
                                          {signer.email}
                                        </p>
                                      )}
                                      {signer.signedAt && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                          Signed {formatDistanceToNow(signer.signedAt, { addSuffix: true })}
                                        </p>
                                      )}
                                    </div>
                                    <Badge className={getStatusBadgeClass(signer.status)}>
                                      {getStatusIcon(signer.status)}
                                      {statusText(signer.status)}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>
                          ) : (
                            <div className="text-center py-8">
                              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                              <p className="font-medium mb-2">No signers yet</p>
                              <p className="text-sm text-muted-foreground mb-6">
                                Add signers to send this document for signatures
                              </p>
                              <Button onClick={handleAddSigners}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Signers
                              </Button>
                            </div>
                          )}
                        </CardContent>
                        {document.signers.length > 0 && document.status !== DocumentStatus.COMPLETED && (
                          <CardFooter>
                            <Button onClick={handleAddSigners} className="w-full">
                              <Plus className="mr-2 h-4 w-4" />
                              Add More Signers
                            </Button>
                          </CardFooter>
                        )}
                      </Card>
                    </TabsContent>

                    <TabsContent value="history" className="mt-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle>Activity History</CardTitle>
                          <CardDescription>
                            Timeline of document activities
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-96">
                            <div className="space-y-4">
                              {document.signers
                                .filter(signer => signer.signedAt)
                                .map((signer) => (
                                  <div
                                    key={`signed-${signer.id}`}
                                    className="flex items-start"
                                  >
                                    <div className="mr-3 h-9 w-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                                      <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <div>
                                      <p className="font-medium">
                                        Signed by {signer.name || signer.email}
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        {signer.signedAt && format(signer.signedAt, "MMM d, yyyy 'at' h:mm a")}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                                
                              <div className="flex items-start">
                                <div className="mr-3 h-9 w-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                                  <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                  <p className="font-medium">
                                    Document sent for signature
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {format(new Date(document.createdAt.getTime() + 24 * 60 * 60 * 1000), "MMM d, yyyy 'at' h:mm a")}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-start">
                                <div className="mr-3 h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                  <FileText className="h-5 w-5" />
                                </div>
                                <div>
                                  <p className="font-medium">
                                    Document uploaded
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {format(document.createdAt, "MMM d, yyyy 'at' h:mm a")}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="details" className="mt-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle>Document Details</CardTitle>
                          <CardDescription>
                            Information about this document
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <dl className="space-y-4">
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Title</dt>
                              <dd className="mt-1">{document.title}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">File Name</dt>
                              <dd className="mt-1">{document.filename}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">File Type</dt>
                              <dd className="mt-1">{document.contentType}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Size</dt>
                              <dd className="mt-1">{(document.size / 1024).toFixed(2)} KB</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Uploaded</dt>
                              <dd className="mt-1">{format(document.createdAt, "MMMM d, yyyy")}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                              <dd className="mt-1">
                                <Badge className={getStatusBadgeClass(document.status)}>
                                  {getStatusIcon(document.status)}
                                  {statusText(document.status)}
                                </Badge>
                              </dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Number of Signers</dt>
                              <dd className="mt-1">{document.signers.length}</dd>
                            </div>
                          </dl>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon" onClick={() => setIsSigningView(false)}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                      Sign Document
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Review and sign {document.title}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
                <div className="md:col-span-4">
                  <Card className="overflow-hidden">
                    <CardHeader className="bg-muted px-6 py-4">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>Document Review</span>
                        <Button variant="ghost" size="sm" onClick={handleDownload}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="relative aspect-[3/4] w-full bg-white flex items-center justify-center">
                        <Image
                          src="https://images.pexels.com/photos/4792282/pexels-photo-4792282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                          alt="Document preview"
                          style={{ objectFit: "contain" }}
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, 66vw"
                        />
                        <div className="absolute bottom-6 right-6 z-10 animate-pulse">
                          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2 shadow-lg">
                            <Pen className="h-4 w-4" />
                            <span>Sign Here</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="md:col-span-2">
                  <Card className="sticky top-8">
                    <CardHeader>
                      <CardTitle>Your Signature</CardTitle>
                      <CardDescription>
                        Review and sign this document
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="border rounded-md p-4 bg-muted/50">
                          <p className="text-sm font-medium mb-2">Signature Preview</p>
                          <div className="h-20 border rounded bg-white flex items-center justify-center">
                            <span className="font-signature text-2xl text-blue-600">
                              {user.name}
                            </span>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" value={user.name} className="mt-1" readOnly />
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" value={user.email} className="mt-1" readOnly />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                      <Button className="w-full" onClick={handleSign}>
                        <Pen className="mr-2 h-4 w-4" />
                        Sign Document
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        By clicking "Sign Document", you agree that this electronic signature is as valid as a physical signature.
                      </p>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}