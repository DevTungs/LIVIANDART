'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import type { Artwork } from '@/lib/gallery'

export default function AdminGalleryPage() {
  const router = useRouter()
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Artwork | null>(null)
  const [uploading, setUploading] = useState(false)

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'ilustracao',
    instagramUrl: '',
    featured: false,
    src: '',
  })

  const fetchGallery = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/gallery')
      if (res.status === 401) {
        router.push('/admin/login')
        return
      }
      const data = await res.json()
      setArtworks(data.artworks || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => { fetchGallery() }, [fetchGallery])

  function resetForm() {
    setForm({ title: '', description: '', category: 'ilustracao', instagramUrl: '', featured: false, src: '' })
    setEditing(null)
    setShowForm(false)
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.success) {
        setForm(prev => ({ ...prev, src: data.src }))
      } else {
        alert(data.error || 'Erro no upload')
      }
    } catch {
      alert('Erro ao fazer upload')
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title || !form.src) {
      alert('Título e imagem são obrigatórios')
      return
    }

    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: editing ? 'update' : 'add',
          id: editing?.id,
          ...(editing ? { data: form } : form),
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        alert(data.error || 'Erro ao salvar')
        return
      }

      resetForm()
      fetchGallery()
    } catch {
      alert('Erro ao salvar')
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Tem certeza que deseja excluir esta arte?')) return

    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id }),
      })

      if (!res.ok) {
        const data = await res.json()
        alert(data.error || 'Erro ao excluir')
        return
      }

      fetchGallery()
    } catch {
      alert('Erro ao excluir')
    }
  }

  function startEdit(art: Artwork) {
    setForm({
      title: art.title,
      description: art.description,
      category: art.category,
      instagramUrl: art.instagramUrl,
      featured: art.featured,
      src: art.src,
    })
    setEditing(art)
    setShowForm(true)
  }

  async function handleLogout() {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch {
      // ignore
    }
  }

  const categories = [
    { value: 'ilustracao', label: 'Ilustração' },
    { value: 'mascote', label: 'Mascote' },
    { value: 'design', label: 'Design' },
    { value: 'fanart', label: 'Fanart' },
    { value: 'outro', label: 'Outro' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="text-pink-600 font-medium">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-pink-700">Gerenciar Galeria</h1>
            <p className="text-pink-600 text-sm">{artworks.length} artes no total</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { resetForm(); setShowForm(true) }}
              className="px-5 py-2 bg-pink-500 text-white rounded-xl font-semibold hover:bg-pink-600 transition-colors"
            >
              + Nova Arte
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-2 border border-pink-300 text-pink-700 rounded-xl font-semibold hover:bg-pink-100 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-4 pt-20 overflow-y-auto">
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-pink-700">
                  {editing ? 'Editar Arte' : 'Nova Arte'}
                </h2>
                <button onClick={resetForm} className="text-pink-400 hover:text-pink-600">✕</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-pink-800 mb-1">Imagem</label>
                  {form.src ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-pink-50 mb-2">
                      <Image src={form.src} alt="Preview" fill sizes="500px" className="object-contain" />
                      <button
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, src: '' }))}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <label className="block aspect-video rounded-xl border-2 border-dashed border-pink-200 bg-pink-50 cursor-pointer hover:border-pink-400 transition-colors">
                      <div className="flex flex-col items-center justify-center h-full text-pink-400">
                        {uploading ? (
                          <span className="text-sm">Enviando...</span>
                        ) : (
                          <>
                            <span className="text-2xl mb-1">📁</span>
                            <span className="text-sm">Clique para upload</span>
                          </>
                        )}
                      </div>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={uploading} />
                    </label>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-pink-800 mb-1">Título</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none text-pink-900"
                      placeholder="Nome da arte"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-pink-800 mb-1">Descrição</label>
                    <textarea
                      value={form.description}
                      onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none text-pink-900 resize-none"
                      placeholder="Descrição opcional"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-pink-800 mb-1">Categoria</label>
                    <select
                      value={form.category}
                      onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none text-pink-900"
                    >
                      {categories.map(c => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-end pb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={e => setForm(prev => ({ ...prev, featured: e.target.checked }))}
                        className="w-4 h-4 accent-pink-500"
                      />
                      <span className="text-sm text-pink-800">Destaque</span>
                    </label>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-pink-800 mb-1">Link do Instagram</label>
                    <input
                      type="url"
                      value={form.instagramUrl}
                      onChange={e => setForm(prev => ({ ...prev, instagramUrl: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none text-pink-900"
                      placeholder="https://instagram.com/p/..."
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-pink-500 text-white rounded-xl font-semibold hover:bg-pink-600 transition-colors"
                  >
                    {editing ? 'Salvar Alterações' : 'Adicionar'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2.5 border border-pink-200 text-pink-700 rounded-xl font-semibold hover:bg-pink-50 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-pink-50 text-pink-700 text-left">
                  <th className="px-4 py-3 font-semibold w-16">ID</th>
                  <th className="px-4 py-3 font-semibold w-20">Imagem</th>
                  <th className="px-4 py-3 font-semibold">Título</th>
                  <th className="px-4 py-3 font-semibold hidden md:table-cell">Categoria</th>
                  <th className="px-4 py-3 font-semibold hidden md:table-cell">Destaque</th>
                  <th className="px-4 py-3 font-semibold hidden md:table-cell">Data</th>
                  <th className="px-4 py-3 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {artworks.map(art => (
                  <tr key={art.id} className="border-t border-pink-50 hover:bg-pink-50/50 transition-colors">
                    <td className="px-4 py-3 text-pink-600">#{art.id}</td>
                    <td className="px-4 py-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-pink-50">
                        <Image src={art.src} alt="" fill sizes="48px" className="object-cover" />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-pink-900 truncate max-w-[200px]">
                      {art.title}
                    </td>
                    <td className="px-4 py-3 text-pink-700 hidden md:table-cell">
                      <span className="px-2 py-0.5 rounded-full bg-pink-100 text-xs">
                        {categories.find(c => c.value === art.category)?.label || art.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {art.featured ? '⭐' : '—'}
                    </td>
                    <td className="px-4 py-3 text-pink-600 text-xs hidden md:table-cell">
                      {art.createdAt}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => startEdit(art)}
                          className="px-3 py-1 text-xs bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(art.id)}
                          className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {artworks.length === 0 && (
            <div className="text-center py-16 text-pink-400">
              <p className="text-lg mb-2">Nenhuma arte ainda</p>
              <button
                onClick={() => { resetForm(); setShowForm(true) }}
                className="text-pink-500 font-semibold hover:text-pink-600"
              >
                Adicionar primeira arte
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
