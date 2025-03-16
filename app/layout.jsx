import './globals.css'

export const metadata = {
  title: 'hansolog',
  description: '프론트엔드 개발자에서 엔지니어로 성장하는 과정을 기록합니다.',
}

export default function RootLayout({ children }) {
  return (
    <html lang={'ko'}>
      <body>{children}</body>
    </html>
  )
}
