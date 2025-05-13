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
} from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { MOCK_DOCUMENTS, Document, DocumentStatus, SignatureStatus } from "@/lib/types";
import { FileText, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { format } from "date-fns";

export default function Sign() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [pendingDocuments, setPendingDocuments] = useState<Document[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/signin");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    // Filter documents that need the current user's signature
    // In a real app, this would filter based on the user's email
    const pending = MOCK_DOCUMENTS.filter(doc => 
      doc.status === DocumentStatus.PENDING && 
      doc.signers.some(signer => 
        signer.status === SignatureStatus.PENDING
      )
    );
    setPendingDocuments(pending);
  }, [user]);

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
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Sign Documents</h1>
            <p className="text-muted-foreground mt-2">
              Review and sign documents that require your signature
            </p>
          </div>

          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Pending Signatures</CardTitle>
                <CardDescription>
                  Documents waiting for your signature
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingDocuments.length > 0 ? (
                  <div className="space-y-4">
                    {pendingDocuments.map((doc) => (
                      <Link
                        key={doc.id}
                        href={`/documents/${doc.id}`}
                        className="flex items-center p-4 rounded-lg border hover:bg-muted transition-colors"
                      >
                        <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center mr-4">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{doc.title}</p>
                          <p className="text-sm text-muted-foreground">
                            From: {doc.signers[0].name || "Document Owner"}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                              Awaiting Signature
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Received {format(doc.createdAt, "MMM d, yyyy")}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                    <h3 className="text-lg font-medium">All caught up!</h3>
                    <p className="text-muted-foreground">
                      You don't have any documents that need your signature right now.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recently Signed</CardTitle>
                <CardDescription>
                  Documents you've signed recently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_DOCUMENTS
                    .filter(doc => 
                      doc.status === DocumentStatus.COMPLETED && 
                      doc.signers.some(signer => 
                        signer.status === SignatureStatus.SIGNED
                      )
                    )
                    .map((doc) => (
                      <Link
                        key={doc.id}
                        href={`/documents/${doc.id}`}
                        className="flex items-center p-4 rounded-lg border hover:bg-muted transition-colors"
                      >
                        <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center mr-4">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{doc.title}</p>
                          <p className="text-sm text-muted-foreground">
                            From: {doc.signers[0].name || "Document Owner"}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium text-green-700 dark:text-green-400">
                              Completed
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Signed {format(doc.signers[0].signedAt || doc.createdAt, "MMM d, yyyy")}
                          </p>
                        </div>
                      </Link>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}