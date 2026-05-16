import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Reloj Universal',
  description: 'Consulta la hora actual de cualquier ciudad o país del mundo',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
