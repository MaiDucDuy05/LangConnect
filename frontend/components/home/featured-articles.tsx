import React from 'react';
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Calendar } from "lucide-react";
import { Button } from "../ui/button";

import { getAllArticles } from "@/database/article"
const FeaturedArticles = () => {

  const articles = getAllArticles().slice(0, 3);
  return (  
    <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Bài Viết Nổi Bật</h2>
            <Link href="/blog" className="text-green-700 hover:text-green-800 flex items-center">
              Xem tất cả
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {
              articles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-49 bg-gray-200">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.title}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-800 p-0">
                        <Link href={`/kien-thuc/${article.id}`}>Đọc tiếp</Link>
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            /* Placeholder articles for demo purposes */
            }
          </div>
        </div>
      </section>
  );
}
export default FeaturedArticles;