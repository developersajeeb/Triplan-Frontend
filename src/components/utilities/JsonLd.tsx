interface JsonLdProps {
  type?: string;
  data?: Record<string, unknown>;
}

const JsonLd: React.FC<JsonLdProps> = ({ type = "TouristTrip", data }) => {
  const schema = { "@context": "https://schema.org", "@type": type, ...data };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default JsonLd