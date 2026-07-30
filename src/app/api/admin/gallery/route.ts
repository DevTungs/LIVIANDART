import { NextRequest, NextResponse } from 'next/server'
import { getGallery, saveGallery } from '@/lib/gallery'
import { isAuthenticated } from '@/lib/auth'

export async function GET() {
  const artworks = await getGallery()
  return NextResponse.json({ artworks })
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const body = await request.json()

    if (!body.action) {
      return NextResponse.json({ error: 'Ação obrigatória' }, { status: 400 })
    }

    const artworks = await getGallery()

    switch (body.action) {
      case 'add': {
        const maxId = artworks.reduce((max, a) => Math.max(max, a.id), 0)
        const newArtwork = {
          id: maxId + 1,
          src: body.src || '',
          title: body.title || 'Sem título',
          description: body.description || '',
          category: body.category || 'ilustracao',
          instagramUrl: body.instagramUrl || '',
          featured: !!body.featured,
          createdAt: new Date().toISOString().split('T')[0],
        }
        artworks.unshift(newArtwork)
        await saveGallery(artworks)
        return NextResponse.json({ success: true, artwork: newArtwork })
      }

      case 'update': {
        const index = artworks.findIndex(a => a.id === body.id)
        if (index === -1) {
          return NextResponse.json({ error: 'Arte não encontrada' }, { status: 404 })
        }
        artworks[index] = { ...artworks[index], ...body.data }
        await saveGallery(artworks)
        return NextResponse.json({ success: true })
      }

      case 'delete': {
        const filtered = artworks.filter(a => a.id !== body.id)
        if (filtered.length === artworks.length) {
          return NextResponse.json({ error: 'Arte não encontrada' }, { status: 404 })
        }
        await saveGallery(filtered)
        return NextResponse.json({ success: true })
      }

      case 'reorder': {
        if (!Array.isArray(body.ids)) {
          return NextResponse.json({ error: 'IDs inválidos' }, { status: 400 })
        }
        const reordered = body.ids
          .map((id: number) => artworks.find(a => a.id === id))
          .filter(Boolean)
        const remaining = artworks.filter(a => !body.ids.includes(a.id))
        await saveGallery([...reordered, ...remaining])
        return NextResponse.json({ success: true })
      }

      default:
        return NextResponse.json({ error: 'Ação inválida' }, { status: 400 })
    }
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
