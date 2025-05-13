"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { MOCK_DOCUMENTS, Document, DocumentStatus } from "@/lib/types";
import { FileText, Plus, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/header";

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

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

  const documentsByStatus = {
    pending: MOCK_DOCUMENTS.filter(doc => doc.status === DocumentStatus.PENDING),
    completed: MOCK_DOCUMENTS.filter(doc => doc.status === DocumentStatus.COMPLETED),
    draft: MOCK_DOCUMENTS.filter(doc => doc.status === DocumentStatus.DRAFT),
  };

  const getStatusIcon = (status: DocumentStatus) => {
    switch (status) {
      case DocumentStatus.PENDING:
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case DocumentStatus.COMPLETED:
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case DocumentStatus.DECLINED:
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <Link href="/documents/upload">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Upload Document
              </Button>
            </Link>
          </div>

          <div className="grid gap-8">
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Documents
                    </CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{MOCK_DOCUMENTS.length}</div>
                    <p className="text-xs text-muted-foreground">
                      +2 from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Awaiting Signatures
                    </CardTitle>
                    <Clock className="h-4 w-4 text-yellow-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{documentsByStatus.pending.length}</div>
                    <p className="text-xs text-muted-foreground">
                      +1 from last week
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Completed
                    </CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{documentsByStatus.completed.length}</div>
                    <p className="text-xs text-muted-foreground">
                      +1 from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Draft
                    </CardTitle>
                    <FileText className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{documentsByStatus.draft.length}</div>
                    <p className="text-xs text-muted-foreground">
                      No change
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Awaiting Signatures</CardTitle>
                    <CardDescription>
                      Documents that need to be signed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {documentsByStatus.pending.length > 0 ? (
                      <div className="space-y-4">
                        {documentsByStatus.pending.map((doc) => (
                          <Link
                            key={doc.id}
                            href={`/documents/${doc.id}`}
                            className="flex items-center p-3 rounded-lg border hover:bg-muted transition-colors"
                          >
                            <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center mr-4">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{doc.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {doc.signers.filter(s => s.status === "pending").length} pending signature(s)
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(doc.status)}
                              <span className="text-sm font-medium">
                                {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No documents awaiting signature
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Your recent document activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[...MOCK_DOCUMENTS].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5).map((doc) => (
                        <Link
                          key={doc.id}
                          href={`/documents/${doc.id}`}
                          className="flex items-center p-3 rounded-lg border hover:bg-muted transition-colors"
                        >
                          <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center mr-4">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{doc.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(doc.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(doc.status)}
                            <span className="text-sm font-medium">
                              {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}