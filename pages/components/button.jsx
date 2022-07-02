export default function Button ({ className, children, ...props }) {
  return (
    <div>
      <button className="bg-white text-black px-3 py-1.5 rounded" {...props}>
        {children}
      </button>
    </div>
  )
}