import RegisterFooter from '~/components/RegisterFooter'
import RegisterHeader from '~/components/RegisterHeader'

interface Props {
  children?: React.ReactNode
}

export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <RegisterFooter />
    </div>
  )
}
