import { Link, Navigate, useParams } from "react-router-dom";
import Footer from "../components/defaults/Footer";
import TopNav from "../components/defaults/TopNav";
import { getBlogPost } from "../data/blog";

const BlogArticle = () => {
  const { slug = "" } = useParams();
  const post = getBlogPost(slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-center px-4 py-6"><TopNav /></header>
      <main>
        <div className="mx-auto w-[90%] max-w-5xl py-10 text-center sm:py-16 lg:py-20">
          <Link to="/blog" className="text-sm font-semibold text-purple-20 hover:underline">← Back to all articles</Link>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-purple-20">{post.category}</p>
          <h1 className="mx-auto mt-4 max-w-4xl text-[36px] font-bold leading-tight sm:text-[50px] lg:text-[62px]">{post.title}</h1>
          <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-[#606060]">
            <span>By {post.author}</span><span aria-hidden="true">•</span><time dateTime={post.publishedAt}>{post.displayDate}</time>
          </div>
        </div>

        <img src={post.img} alt="" className="h-[300px] w-full object-cover sm:h-[480px] lg:h-[620px]" />

        <article className="mx-auto w-[90%] py-12 sm:py-16 lg:w-[60%] lg:max-w-4xl lg:py-24">
          <p className="text-xl font-medium leading-8 text-[#282828] sm:text-2xl sm:leading-10">{post.excerpt}</p>
          {post.content.map((section) => (
            <section key={section.heading} className="mt-10 sm:mt-14">
              <h2 className="text-[28px] font-semibold leading-tight sm:text-[36px]">{section.heading}</h2>
              <div className="mt-5 space-y-5 text-[16px] leading-8 text-[#383838] sm:text-[18px]">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.points && <ul className="mt-6 space-y-3 pl-6 text-[16px] leading-7 sm:text-[18px]">{section.points.map((point) => <li key={point} className="list-disc marker:text-purple-20">{point}</li>)}</ul>}
            </section>
          ))}
          <div className="mt-14 border-t border-black/10 pt-8"><Link to="/contact" className="inline-flex rounded-xl bg-purple-20 px-6 py-3 font-semibold text-white hover:bg-purple-20/90">Speak with a property advisor</Link></div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogArticle;
