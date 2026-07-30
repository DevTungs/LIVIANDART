'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Artwork } from '@/lib/gallery'

interface Props {
  artworks: Artwork[]
}

export default function GalleryGrid({ artworks }: Props) {
  const [selected, setSelected] = useState<Artwork | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {artworks.map(art => (
          <button
            key={art.id}
            onClick={() => setSelected(art)}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-pink-50 hover:shadow-lg transition-all duration-300"
          >
            <Image
              src={art.src}
              alt={art.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              <span className="text-white text-sm font-medium truncate">{art.title}</span>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-pink-800 hover:bg-white transition-colors"
            >
              ✕
            </button>
            <div className="relative w-full min-h-0 flex-1 flex items-center justify-center bg-black/5 p-2">
              <img
                src={selected.src}
                alt={selected.title}
                className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-lg"
              />
            </div>
            <div className="p-4 bg-white shrink-0">
              <h3 className="font-bold text-pink-800">{selected.title}</h3>
              {selected.description && (
                <p className="text-sm text-pink-700 mt-1">{selected.description}</p>
              )}
              {selected.instagramUrl && (
                <a
                  href={selected.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-xs text-pink-500 hover:text-pink-600 transition-colors"
                >
                  Ver no Instagram →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
