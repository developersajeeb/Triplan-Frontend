import WhiteSvgIcon from "@/components/shared/blocks/WhiteSvgIcon";
import { Link } from "react-router";
import BlogCard from "@/components/shared/blocks/BlogCard";

const NewsArticles = () => {
    return (
        <section className="tp-container py-12 md:py-16 lg:py-20">
            <div className='flex flex-col sm:flex-row sm:items-end gap-2'>
                <div className='flex-1 mb-3 sm:mb-0'>
                    <h4 className="section-sub-title text-primary-950">
                        News & Articles
                    </h4>
                    <h2 className="section-title text-primary-950">
                        Stories, news & insights
                    </h2>
                </div>

                <div>
                    <Link className="tp-primary-btn inline-flex items-center gap-3" to="/turn-guider">
                        More Articles
                        <WhiteSvgIcon className="w-4 md:w-auto h-4 md:h-auto" />
                    </Link>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-5 mt-10">
                <BlogCard />
                <BlogCard />
                <BlogCard />
            </div>
        </section>
    );
};

export default NewsArticles;