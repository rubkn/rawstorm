import Image from "next/image";

export default function FeaturedPhotos({ photosUrl }: { photosUrl: string[] }) {
  return (
    <section id="gallery" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Featured Shots
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photosUrl.map((i) => (
            <Image
              key={i}
              alt={`Featured analog photograph ${i}`}
              className="aspect-square object-cover rounded-lg"
              height="300"
              src={`photosUrl`}
              width="300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
