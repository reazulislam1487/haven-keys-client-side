import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import usePageTitle from "../../hooks/usePageTitle";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Tips for First-Time Home Buyers",
    date: "July 10, 2025",
    excerpt:
      "Buying your first home? Here’s what you need to know—from budgeting to closing the deal with confidence.",
    image: "https://i.postimg.cc/wjCJKhg5/image-11-1140x570.webp",
  },
  {
    id: 2,
    title: "2025 Real Estate Trends You Should Know",
    date: "July 5, 2025",
    excerpt:
      "Discover the latest market trends, pricing forecasts, and neighborhood shifts to make informed investment decisions.",
    image: "https://i.postimg.cc/5NZjjbTb/shutterstock-1100834378.jpg",
  },
  {
    id: 3,
    title: "Modern Interior Design Ideas to Boost Property Value",
    date: "June 29, 2025",
    excerpt:
      "Upgrade your property’s appeal with trending interiors, minimalist layouts, and value-adding décor tips.",
    image: "https://i.postimg.cc/xCT1BCJy/i-Stock-1391413216-1.jpg",
  },
];

const BlogSection = () => {
  usePageTitle("Blogs");

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto text-center mb-12"
      >
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Blogs</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stay updated with expert tips, property market insights, and home
          design inspiration.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-3 max-w-7xl px-4 mx-auto">
        {blogPosts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.2, duration: 0.5 }}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
          >
            <div className="overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover transform hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{post.date}</p>
              <p className="text-gray-700 mb-5 leading-relaxed">
                {post.excerpt}
              </p>
              <a
                href="#"
                className="inline-flex items-center text-orange-500 hover:text-orange-600 font-semibold"
              >
                Read More <FaArrowRight className="ml-2" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
