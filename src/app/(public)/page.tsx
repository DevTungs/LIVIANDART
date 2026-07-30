import Image from 'next/image'
import Link from 'next/link'
import { getFeatured } from '@/lib/gallery'
import GalleryGrid from '@/components/GalleryGrid'

export default async function Home() {
  const featured = await getFeatured()

  return (
    <div>
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-pink-50 via-white to-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-pink-200 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-pink-300 blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="mb-6">
            <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-pink-200 shadow-lg">
              <Image
                src="/images/gallery/art-02.jpg"
                alt="Liv"
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-pink-600 mb-4">
            Liv<span className="text-pink-400">Andrart</span>
          </h1>
          <p className="text-lg md:text-xl text-pink-800 mb-8 font-medium">
            Ilustração &bull; Design &bull; Mascotes
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/gallery"
              className="px-8 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-colors shadow-lg shadow-pink-200"
            >
              Ver Galeria
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border-2 border-pink-300 text-pink-700 rounded-full font-semibold hover:bg-pink-50 transition-colors"
            >
              Fale Comigo
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-pink-700 mb-3">Destaques</h2>
          <p className="text-pink-600">Algumas das minhas artes favoritas</p>
        </div>
        <GalleryGrid artworks={featured} />
        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-block px-8 py-3 bg-pink-100 text-pink-700 rounded-full font-semibold hover:bg-pink-200 transition-colors"
          >
            Ver Todas as Artes
          </Link>
        </div>
      </section>
    </div>
  )
}
