import { getGallery } from '@/lib/gallery'
import GalleryGrid from '@/components/GalleryGrid'

export default async function GalleryPage() {
  const artworks = await getGallery()

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-pink-700 mb-3">Galeria</h1>
        <p className="text-pink-600">Todas as minhas artes em um só lugar</p>
      </div>
      <GalleryGrid artworks={artworks} />
    </div>
  )
}
