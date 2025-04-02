import clsx from "clsx"

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

function Container({ children, className }: ContainerProps) {
  return (
    <div className={clsx(className, "w-full max-w-5xl px-6 mx-auto")}>
      {children}
    </div>
  )
}

export { Container }