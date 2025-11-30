import ImageWaterMark from '@/assets/images/image-watermark.webp'

interface Props {
    title: string,
    description: string,
    featureImage: string,
    canonicalUrl: string,
}

export default function CommonMetadata({ title, description, featureImage, canonicalUrl }: Props) {
    return (
        <>
            <title>{title || 'TriPlan'}</title>
            <meta name="description" content={description || 'Your Best Tour Planer'} />
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
