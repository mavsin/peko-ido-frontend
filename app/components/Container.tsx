
interface IProps {
  className?: string;
  children: any;
}

export default function Container({ className = '', children }: IProps) {
  return (
    <div className={`container max-w-7xl mx-auto xl:px-0 px-4 ${className}`}>
      {children}
    </div>
  )
}