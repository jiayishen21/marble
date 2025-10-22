import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ReactMarkdown from "react-markdown";

type BlogItem = {
  _id?: string;
  title: string;
  type: "post" | "file";
  content?: string;
  link?: string;
  category?: "blog" | "legacy" | "core";
};

export default function BlogDetails() {
  const router = useRouter();
  const { id } = router.query as { id?: string };
  const [blog, setBlog] = useState<BlogItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await axios.get(`/api/blogs/${id}`);
        setBlog(res.data);
      } catch (e: any) {
        setError("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <main className="p-8">Loading...</main>;
  if (error) return <main className="p-8 text-red-600">{error}</main>;
  if (!blog) return <main className="p-8">Not found.</main>;

  if (blog.type === "file" && blog.link) {
    // For file entries, redirect users to the file
    if (typeof window !== "undefined") {
      window.location.href = blog.link;
    }
    return <main className="p-8">Redirecting...</main>;
  }

  return (
    <main className="p-8 lg:p-12 2xl:py-16 2xl:px-36">
      <article className="prose max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <div className="text-gray-800 leading-relaxed">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold mb-4 mt-6 text-gray-900">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold mb-3 mt-5 text-gray-900">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold mb-2 mt-4 text-gray-900">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-4 text-gray-800 leading-relaxed">{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-gray-900">{children}</strong>
              ),
              u: ({ children }) => <u className="underline">{children}</u>,
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 space-y-1">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 space-y-1">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-800">{children}</li>
              ),
            }}
          >
            {blog.content || ""}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
