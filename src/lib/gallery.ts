import { promises as fs } from 'fs'
import path from 'path'

export interface Artwork {
  id: number
  src: string
  title: string
  description: string
  category: string
  instagramUrl: string
  featured: boolean
  createdAt: string
}

export interface GalleryData {
  artworks: Artwork[]
}

const DATA_FILE = path.join(process.cwd(), 'public', 'data', 'gallery.json')

export async function getGallery(): Promise<Artwork[]> {
  const content = await fs.readFile(DATA_FILE, 'utf-8')
  const data: GalleryData = JSON.parse(content)
  return data.artworks
}

export async function getFeatured(): Promise<Artwork[]> {
  const all = await getGallery()
  return all.filter(a => a.featured)
}

export async function getArtworkById(id: number): Promise<Artwork | undefined> {
  const all = await getGallery()
  return all.find(a => a.id === id)
}

export async function saveGallery(artworks: Artwork[]): Promise<void> {
  const data: GalleryData = { artworks }
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
}
