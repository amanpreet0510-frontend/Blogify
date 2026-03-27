import { BlogList } from "@/components/blog/BlogList";
import { getAllBlogs, getAllCategories, getEatPage } from "@/lib/getBlogs";


export default async function TravelPage() {
    const [eatData,blogs,categories] = await Promise.all([
        getEatPage(),
        getAllBlogs(),
        getAllCategories()
    ]);

    if (!eatData) {
        return <div>Loading...</div>; // Or some other fallback
    }

    return (
        <div className=" bg-background text-foreground">
           
                <main key={eatData._id} className=" bg-white text-gray-800 px-6 py-12">
                    <div className="m-15 mx-auto  flex justify-between gap-15">
                        <div className="container">
                            {/* Heading */}
                            <h1 className="text-4xl font-bold mb-6">
                                {eatData.title}
                            </h1>
                            <p className="max-w-4xl">
                                {eatData.excerpt}
                            </p>
                        </div>
                        </div>
                        <BlogList blogs={blogs} categories={categories} showSearch={blogs[0]?.showSearch} />
                    
                </main>
           
        </div>
    );
}