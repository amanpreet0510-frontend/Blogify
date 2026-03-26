import Link from "next/link";
import { PenLine } from "lucide-react";
import { getHeader } from "@/lib/getBlogs";
import { Button } from "@/components/ui/button";
import Image from "next/image";



export async function Header() {
  const header = await getHeader();

  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container">
        <div className="flex justify-between">
          <div className="mt-5 flex h-16 max-w-6xl px-4 sm:px-6">
            <Link href="/" className="flex  gap-2 transition-opacity hover:opacity-80">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <img src={header?.logoUrl} />
                <PenLine className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">DevBlog</span>
            </Link>
          </div>
          <div className="flex items-center gap-10">
            {header?.navigation?.map((item, index) => {
              return (
                <nav key={index} className="flex items-center gap-1">
                  <Link
                    href={item?.link || "#"}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item?.label}
                  </Link>

                </nav>)
            })
            }
            <Button>
              {header?.cta?.label}
            </Button>
          </div>
          <div className="flex justify-between mt-5 gap-7">
            {header?.socialIcons?.map((item, index) => (
              <Link
                key={index}
                href={item?.link || "#"}
                target={item?.openInNewTab ? "_blank" : "_self"}
                rel={item?.openInNewTab ? "noopener noreferrer" : ""}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <Image
                  src={item.iconUrl}
                  alt="social icon"
                  width={20}
                  height={20}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
