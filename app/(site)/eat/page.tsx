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
           
                <main key={eatData._id} className=" bg-white px-6 py-10 text-gray-800 sm:py-12">
                    <div className="mx-auto flex max-w-6xl justify-between">
                        <div className="container">
                            {/* Heading */}
                            <h1 className="mb-6 text-3xl font-bold sm:text-4xl">
                                {eatData.title}
                            </h1>
                            <p className="max-w-4xl text-sm sm:text-base">
                                {eatData.excerpt}
                            </p>
                        </div>
                        </div>
                        <BlogList blogs={blogs} categories={categories} showSearch={blogs[0]?.showSearch} />
                    
                </main>
           
        </div>
    );
}