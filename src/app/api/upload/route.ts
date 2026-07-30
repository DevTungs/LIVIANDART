import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
})

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Arquivo obrigatório' }, { status: 400 })
    }

    const hasCloudinary =
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET

    if (hasCloudinary) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const result = await new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'livandrart', resource_type: 'image' },
          (err, result) => {
            if (err || !result) reject(err || new Error('Upload failed'))
            else resolve(result.secure_url)
          }
        )
        uploadStream.end(buffer)
      })

      return NextResponse.json({ success: true, src: result })
    }

    return NextResponse.json(
      { error: 'Cloudinary não configurado. Configure as variáveis de ambiente CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY e CLOUDINARY_API_SECRET.' },
      { status: 500 }
    )
  } catch {
    return NextResponse.json({ error: 'Erro no upload' }, { status: 500 })
  }
}
