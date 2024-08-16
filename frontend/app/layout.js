import './globals.css'

export const metadata = {
  title: 'トークルーレット',
  description: 'ランダムな話題でコミュニケーションを促進するアプリ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}