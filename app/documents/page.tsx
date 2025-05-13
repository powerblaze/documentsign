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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useAuth } from "@/contexts/auth-context";
import { MOCK_DOCUMENTS, Document, DocumentStatus } from "@/lib/types";
import { FileText, Plus, Clock, CheckCircle2, AlertTriangle, Search } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { format } from "date-fns";

export default function Documents() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [documents, setDocuments] = useState<Document[]>(MOCK_DOCUMENTS);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(documents);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/signin");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    let filtered = [...documents];
    
    if (searchQuery) {
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(doc => doc.status === statusFilter);
    }
    
    setFilteredDocuments(filtered);
  }, [documents, searchQuery, statusFilter]);

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

  const getStatusIcon = (status: DocumentStatus) => {
    switch (status) {
      case DocumentStatus.PENDING:
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case DocumentStatus.COMPLETED:
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case DocumentStatus.DECLINED:
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case DocumentStatus.DRAFT:
        return <FileText className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };
  
  const getStatusBadgeClass = (status: DocumentStatus) => {
    const baseClasses = "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold";
    switch (status) {
      case DocumentStatus.PENDING:
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300`;
      case DocumentStatus.COMPLETED:
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`;
      case DocumentStatus.DECLINED:
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300`;
      case DocumentStatus.DRAFT:
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
            <Link href="/documents/upload">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Upload Document
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Document Library</CardTitle>
              <CardDescription>
                View and manage all your documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search documents..."
                      className="pl-8 w-[250px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="declined">Declined</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {filteredDocuments.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Signers</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDocuments.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">
                            <Link href={`/documents/${doc.id}`} className="hover:text-primary">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-md bg-primary/10 text-primary flex items-center justify-center mr-3">
                                  <FileText className="h-4 w-4" />
                                </div>
                                {doc.title}
                              </div>
                            </Link>
                          </TableCell>
                          <TableCell>
                            {format(doc.createdAt, "MMM d, yyyy")}
                          </TableCell>
                          <TableCell>
                            {doc.signers.length === 0 ? (
                              <span className="text-muted-foreground">No signers</span>
                            ) : (
                              <div className="space-y-1">
                                {doc.signers.map((signer, i) => (
                                  <div key={i} className="text-sm">
                                    {signer.name || signer.email}
                                    {signer.status === "signed" && (
                                      <CheckCircle2 className="h-3 w-3 text-green-500 inline ml-1" />
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className={getStatusBadgeClass(doc.status)}>
                              {getStatusIcon(doc.status)}
                              <span>
                                {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No documents found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery || statusFilter !== "all"
                      ? "Try adjusting your search or filters"
                      : "Upload your first document to get started"}
                  </p>
                  {!searchQuery && statusFilter === "all" && (
                    <Link href="/documents/upload">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" /> Upload Document
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}