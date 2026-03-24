import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function BlogNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto flex max-w-4xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
        <div className="mb-6 rounded-full bg-secondary p-6">
          <FileQuestion className="h-12 w-12 text-muted-foreground" />
        </div>

        <h1 className="mb-4 text-3xl font-bold">Article Not Found</h1>
        <p className="mb-8 max-w-md text-muted-foreground">
          The article you are looking for does not exist or has been removed.
          Please check the URL or browse our other articles.
        </p>

        <Link href="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all articles
          </Button>
        </Link>
      </main>
    </div>
  );
}
