import WhiteSvgIcon from "@/components/shared/blocks/WhiteSvgIcon";
import { Link } from "react-router";
import ImageWaterMark from '@/assets/images/image-watermark.webp';
import { formatBlogDate } from '@/pages/admin/blogs/blog-data';

type BlogCardProps = {
    title?: string;
    slug?: string;
    category?: string;
    createdAt?: string;
    featureImage?: string;
    excerpt?: string;
};

const BlogCard = ({ title = 'Exploring The Green Spaces Of Realar Residence', slug = '#', category = 'General', createdAt = '2026-01-10T00:00:00.000Z', featureImage = ImageWaterMark, excerpt = 'Discover destinations, planning tips, and travel insights in a format that is easy to scan.' }: BlogCardProps) => {
    return (
        <div className="group">
            <div className="h-[250px] overflow-hidden rounded-2xl">
                <img src={featureImage} alt={title} className="group-hover:scale-110 duration-300 overflow-hidden w-full h-full object-cover rounded-2xl" />
            </div>
            <div className="flex gap-3 mt-3 flex-wrap">
                <p className='text-sm text-gray-600 font-medium'>{formatBlogDate(createdAt)}</p>
                <div className="flex gap-2 flex-wrap">
                    <span className="text-sm font-bold text-gray-700">{category}</span>
                </div>
            </div>
            <Link to={slug === '#' ? '/blog' : `/blog/${slug}`}>
                <h6 className='text-2xl font-bold text-primary-900 hover:text-primary-500 duration-300 mt-3 mb-3 line-clamp-2'>{title}</h6>
            </Link>
            <p className="text-sm leading-6 text-gray-600 mb-5 line-clamp-3">{excerpt}</p>
            <Link className="tp-transparent-black-btn !px-5 !py-3 inline-flex items-center gap-3" to={slug === '#' ? '/blog' : `/blog/${slug}`}>
                Read More
                <WhiteSvgIcon className="w-4 h-4" />
            </Link>
        </div>
    );
};

export default BlogCard;