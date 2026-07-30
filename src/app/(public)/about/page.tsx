import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl">
          <Image
            src="/images/gallery/art-03.jpg"
            alt="Livia Andrade"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-pink-700 mb-4">Sobre Mim</h1>
          <p className="text-pink-800 leading-relaxed mb-4">
            Oi! Eu sou a <strong className="text-pink-600">Liv</strong>, ilustradora e designer gráfica apaixonada por transformar ideias em arte.
          </p>
          <p className="text-pink-800 leading-relaxed mb-4">
            Trabalho com ilustração digital há mais de 6 anos, criando desde mascotes universitários
            até ilustrações personalizadas. Meu estilo mistura cartoon, streetwear e cores vibrantes.
          </p>
          <p className="text-pink-800 leading-relaxed mb-4">
            Uso <strong>Procreate</strong>, <strong>Adobe Illustrator</strong> e{' '}
            <strong>Adobe Photoshop</strong> para dar vida às minhas criações.
          </p>
          <p className="text-pink-800 leading-relaxed">
            Amo o que faço e cada projeto é único — assim como você.
          </p>
        </div>
      </div>
    </div>
  )
}
