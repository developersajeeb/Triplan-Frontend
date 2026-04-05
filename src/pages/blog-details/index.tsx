import ImageWaterMark from '@/assets/images/image-watermark.webp'

const BlogDetails = () => {
    return (
        <div className="tp-container py-14">
            <h1 className="text-5xl font-semibold text-primary-900 mb-4">San Francisco City Hall Weddings 101</h1> 
            <div className="flex gap-3 mt-3 flex-wrap mb-8">
                <p className='text-base text-gray-600 font-medium'>January 10, 2026</p>
                <div className="flex gap-2 flex-wrap">
                    <span className="text-base font-bold text-gray-700">General</span>
                </div>
            </div>
            
             <img src={ImageWaterMark} alt="Blog Image" className="duration-300 w-full h-auto object-cover rounded-2xl" />

             <div className="mt-8">
                 <p className="text-lg font-medium text-gray-700 leading-relaxed">
                     San Francisco City Hall weddings are a unique and romantic way to celebrate your love. With its historic architecture and stunning views, the City Hall provides a beautiful backdrop for your special day. In this guide, we'll walk you through everything you need to know about planning your dream wedding at San Francisco City Hall.
                 </p>
             </div>
        </div>
    );
};

export default BlogDetails;