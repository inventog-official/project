"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, FileText, Clover as Government, Presentation as PresentationChart } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogs } from '@/lib/api';

export default function BlogPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs
  });

  const blogs = data?.blogs || [];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Solar Energy Insights & Updates
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Stay informed with the latest news, trends, and expert advice about solar energy and sustainable living.
            </p>
          </motion.div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: "Solar Basics",
                description: "Learn the fundamentals of solar energy systems"
              },
              {
                icon: <FileText className="h-8 w-8" />,
                title: "Installation Tips",
                description: "Expert guidance for optimal solar setup"
              },
              {
                icon: <Government className="h-8 w-8" />,
                title: "Government Schemes",
                description: "Latest updates on solar policies and subsidies"
              },
              {
                icon: <PresentationChart className="h-8 w-8" />,
                title: "Case Studies",
                description: "Real success stories from our customers"
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-lg p-6 text-center cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Blog Posts */}
          {isLoading ? (
            <div className="text-center py-8">Loading blog posts...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">Error loading blog posts</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={blog.imageUrl}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-sm text-primary font-medium">{blog.category}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                    <p className="text-muted-foreground mb-4">{blog.excerpt}</p>
                    <Link href={`/blog/${blog.id}`}>
                      <Button variant="link" className="p-0 h-auto font-medium text-primary">
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}