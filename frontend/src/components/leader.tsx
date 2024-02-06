
const Leader = () => {
  return (
    <div>
      Loading...
    </div>
  )
}

export default Leader

interface SkeletonProps {
  width?: string;
  length?: number
}

export const Skeleton = ({ width = 'unset', length = 3 }: SkeletonProps) => {
  Array.from({ length })
  return (
    <div className="skeleton-loader">
      <div className="skeleton-shape" style={{ width }}></div>
      <div className="skeleton-shape"></div>
      <div className="skeleton-shape"></div>
    </div>
  )
}

