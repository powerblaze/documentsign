import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Header } from "@/components/layout/header";

const features = [
  {
    title: "Simple Document Signing",
    description: "Sign documents from anywhere, on any device, with just a few clicks.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="h-10 w-10 text-primary"
      >
        <path d="M20 6v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
        <path d="M17 14h-5" />
        <path d="M17 10h-5" />
        <path d="M8 22H6a2 2 0 0 1-2-2V9" />
      </svg>
    ),
  },
  {
    title: "Workflow Automation",
    description: "Create approval workflows and automate your document signing process.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="h-10 w-10 text-primary"
      >
        <path d="M12 2H2v10h10V2Z" />
        <path d="M22 12h-4v10h4V12Z" />
        <path d="M14 18h-4v4h4v-4Z" />
        <path d="M14 2h-4v10h4V2Z" />
        <path d="M14 2h8v6h-8V2Z" />
      </svg>
    ),
  },
  {
    title: "Email Notifications",
    description: "Get notified when documents are ready to sign or have been completed.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="h-10 w-10 text-primary"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    title: "Secure & Compliant",
    description: "Bank-level security with audit trails for all document activities.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="h-10 w-10 text-primary"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted">
          <div className="container flex flex-col items-center text-center gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Document Signing <span className="text-primary">Made Simple</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A faster, easier way to sign and manage documents. Get legally binding signatures from anyone, anywhere, on any device.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/auth/signup">
                <Button size="lg" className="h-12 px-8">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="h-12 px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight">
                Powerful Features for All Your Document Needs
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Our platform provides everything you need to streamline your document workflows
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, i) => (
                <div 
                  key={i} 
                  className="flex flex-col items-center text-center p-6 rounded-lg border bg-card transition-all duration-200 hover:shadow-md"
                >
                  <div className="p-2 mb-4 rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-xl">{feature.title}</h3>
                  <p className="text-muted-foreground mt-2">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight">
                How It Works
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Sign documents in minutes with our easy to use platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-4">1</div>
                <h3 className="font-semibold text-xl">Upload Your Document</h3>
                <p className="text-muted-foreground mt-2">
                  Upload any document that needs signatures from your computer
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-4">2</div>
                <h3 className="font-semibold text-xl">Add Signers</h3>
                <p className="text-muted-foreground mt-2">
                  Specify who needs to sign and in what order
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-4">3</div>
                <h3 className="font-semibold text-xl">Get Signatures</h3>
                <p className="text-muted-foreground mt-2">
                  Recipients sign securely from any device, anywhere
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Ready to Streamline Your Document Workflows?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Join thousands of businesses that trust DocSign for their document signing needs
            </p>
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="h-12 px-8">
                Sign Up for Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-background">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M20 6v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
                <path d="M17 14h-5" />
                <path d="M17 10h-5" />
                <path d="M8 22H6a2 2 0 0 1-2-2V9" />
              </svg>
              <span className="font-semibold text-lg">DocSign</span>
            </div>
            <div className="flex gap-8">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Help
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © 2025 DocSign. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}