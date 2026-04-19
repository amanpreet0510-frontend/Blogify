import { Header } from "@/components/layout/Header";
import { getHeader } from "@/lib/getBlogs";

export default async function Page() {
  const headerData = await getHeader();

  return (
    <>
      <Header header={headerData} />
      <div className="p-10">Page Content</div>
    </>
  );
}