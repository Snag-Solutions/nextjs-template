interface HeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  children: React.ReactNode
}

const headerStyles: Record<
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p',
  string
> = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-semibold',
  h3: 'text-2xl font-medium',
  h4: 'text-xl font-medium',
  h5: 'text-lg font-medium',
  h6: 'text-base font-normal',
  p: 'text-base font-normal',
}

export const Header: React.FC<HeaderProps> = ({
  as = 'h1',
  children,
  className = '',
  ...props
}) => {
  const Tag = as
  return (
    <Tag className={`${headerStyles[as]} ${className}`} {...props}>
      {children}
    </Tag>
  )
}
