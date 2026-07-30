import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-pink-700 mb-3">Contato</h1>
        <p className="text-pink-600">Vamos criar algo incrível juntos?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-6 bg-green-50 rounded-2xl border border-green-200 hover:shadow-lg transition-all group"
        >
          <span className="text-4xl">💬</span>
          <div>
            <h3 className="font-bold text-green-700 group-hover:text-green-600 transition-colors">WhatsApp</h3>
            <p className="text-sm text-green-600">Resposta rápida</p>
          </div>
        </a>

        <a
          href="https://www.instagram.com/livandrart/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-6 bg-pink-50 rounded-2xl border border-pink-200 hover:shadow-lg transition-all group"
        >
          <span className="text-4xl">📸</span>
          <div>
            <h3 className="font-bold text-pink-700 group-hover:text-pink-600 transition-colors">Instagram</h3>
            <p className="text-sm text-pink-600">@livandrart</p>
          </div>
        </a>

        <a
          href="mailto:livia@livandrart.com"
          className="flex items-center gap-4 p-6 bg-purple-50 rounded-2xl border border-purple-200 hover:shadow-lg transition-all group"
        >
          <span className="text-4xl">✉️</span>
          <div>
            <h3 className="font-bold text-purple-700 group-hover:text-purple-600 transition-colors">E-mail</h3>
            <p className="text-sm text-purple-600">livia@livandrart.com</p>
          </div>
        </a>

        <Link
          href="/services"
          className="flex items-center gap-4 p-6 bg-amber-50 rounded-2xl border border-amber-200 hover:shadow-lg transition-all group"
        >
          <span className="text-4xl">📋</span>
          <div>
            <h3 className="font-bold text-amber-700 group-hover:text-amber-600 transition-colors">Catálogos</h3>
            <p className="text-sm text-amber-600">Veja meus serviços</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
