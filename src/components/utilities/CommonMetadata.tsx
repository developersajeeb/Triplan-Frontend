import ImageWaterMark from '@/assets/images/image-watermark.webp'

interface Props {
    title?: string,
    description?: string,
    keywords?: string,
    featureImage?: string,
    canonicalUrl?: string,
}

export default function CommonMetadata({ title, description, keywords, featureImage, canonicalUrl }: Props) {
    return (
        <>
            <title>{title || 'triPlan'}</title>
            <meta name="description" content={description || 'Your Best Tour Planer'} />
            <meta name="keywords" content={keywords || 'tour, travel, trip, tourist, tour planner, triPlan, react application, MERN website, saas product, multi vendor e-commerce'} />
            <meta property="og:title" content={title || 'TriPlan'} />
            <meta property="og:description" content={description || 'Your Best Tour Planer'} />
            <meta property="og:image" content={featureImage || ImageWaterMark} />
            <link
                rel="canonical"
                href={canonicalUrl}
            />
        </>
    );
}
