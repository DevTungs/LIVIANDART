import Link from 'next/link'

const services = [
  {
    title: 'Mascotes Universitários',
    description: 'Criação de mascotes personalizados para atléticas, empresas e instituições.',
    icon: '🎓',
    link: 'https://www.instagram.com/livandrart/',
    linkLabel: 'Catálogo Mascotes',
  },
  {
    title: 'Ilustração Digital',
    description: 'Ilustrações 2D no estilo cartoon com cores vibrantes e personalidade.',
    icon: '🎨',
    link: 'https://www.instagram.com/livandrart/',
    linkLabel: 'Catálogo Geral',
  },
  {
    title: 'Design Gráfico',
    description: 'Logotipos, identidade visual, banners e materiais gráficos.',
    icon: '✏️',
  },
  {
    title: 'Arte Personalizada',
    description: 'Fanarts, retratos, personagens e ilustrações sob encomenda.',
    icon: '🖌️',
  },
]

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-pink-700 mb-3">Serviços</h1>
        <p className="text-pink-600">Do que você precisa? Veja o que posso fazer por você</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((s, i) => (
          <div
            key={i}
            className="bg-pink-50 rounded-2xl p-6 border border-pink-100 hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-3">{s.icon}</div>
            <h3 className="text-xl font-bold text-pink-700 mb-2">{s.title}</h3>
            <p className="text-pink-800 leading-relaxed mb-4">{s.description}</p>
            {s.link && (
              <a
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-pink-500 text-white rounded-full text-sm font-semibold hover:bg-pink-600 transition-colors"
              >
                {s.linkLabel || 'Saiba mais'}
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-12 p-8 bg-gradient-to-r from-pink-100 to-pink-50 rounded-2xl border border-pink-200">
        <h2 className="text-2xl font-bold text-pink-700 mb-3">Quer um orçamento?</h2>
        <p className="text-pink-800 mb-4">Me chama no WhatsApp que a gente conversa!</p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-colors shadow-lg"
        >
          Entrar em Contato
        </Link>
      </div>
    </div>
  )
}
