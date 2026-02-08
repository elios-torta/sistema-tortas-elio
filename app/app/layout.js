export const metadata = {
  title: 'Sistema Tortas Elio',
  description: 'Sistema de ventas',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  )
}
