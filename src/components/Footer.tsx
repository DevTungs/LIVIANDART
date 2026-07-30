import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-pink-50 border-t border-pink-100 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-pink-600 mb-3">LivAndrart</h3>
            <p className="text-sm text-pink-800 leading-relaxed">
              Ilustração e Design com amor e criatividade.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-pink-600 mb-3">Links</h3>
            <div className="space-y-2">
              <Link href="/gallery" className="block text-sm text-pink-800 hover:text-pink-600 transition-colors">Galeria</Link>
              <Link href="/about" className="block text-sm text-pink-800 hover:text-pink-600 transition-colors">Sobre</Link>
              <Link href="/services" className="block text-sm text-pink-800 hover:text-pink-600 transition-colors">Serviços</Link>
              <Link href="/contact" className="block text-sm text-pink-800 hover:text-pink-600 transition-colors">Contato</Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-pink-600 mb-3">Redes</h3>
            <div className="space-y-2">
              <a
                href="https://www.instagram.com/livandrart/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-pink-800 hover:text-pink-600 transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-pink-800 hover:text-pink-600 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-pink-200 text-center">
          <p className="text-xs text-pink-600">
            &copy; {new Date().getFullYear()} LivAndrart. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
