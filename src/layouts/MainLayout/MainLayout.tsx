import Header from '~/components/Header'
import Footer from '~/components/RegisterFooter/RegisterFooter'

type Props = {
  children?: React.ReactNode
}
export default function MainLayout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
