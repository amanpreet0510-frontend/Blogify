import React from "react";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import {getAboutPage} from "@/lib/getBlogs";

export default async  function AboutPage() {
const [aboutData] = await Promise.all([
    getAboutPage()
  ]);

  console.log('aboutData', aboutData)

  return (
 <div className="min-h-screen bg-background">
      <Header />

      {aboutData?.map((item)=><>
    <main className="min-h-screen bg-white text-gray-800 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Heading */}
        <h1 className="text-4xl font-bold mb-6">
          {item?.title}
        </h1>

        {/* Intro */}
        <p className="text-lg mb-4">
          {item?.excerpt}<span className="font-semibold">Blogify</span> 
        </p>

        {/* Mission */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p>{item?.description}
          </p>
        </section>

        {/* What we offer */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>📝 Easy blog publishing</li>
            <li>⚡ Fast and optimized performance</li>
            <li>📱 Responsive design</li>
            <li>🔍 SEO-friendly content structure</li>
          </ul>
        </section>

        {/* Tech stack */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Built With</h2>
          <p>
            This platform is built using modern technologies like Next.js,
            Tailwind CSS, and a headless CMS for content management.
          </p>
        </section>

        {/* Footer*/}
         <Footer/>
      </div>
    </main>
    </>)}
     </div>
  );
}