import { GrHomeRounded } from "react-icons/gr"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-center text-6xl font-bold text-gray-800">
          404
        </h1>
        <h2 className="mb-6 text-3xl font-semibold text-gray-600">
          Page Not Found
        </h2>
        <p className="mb-8 text-gray-500">
          {`Oops! The page you're looking for doesn't exist.`}
        </p>
        <Link
          to={"/"}
          className="inline-flex items-center rounded-md bg-customDark px-4 py-2 text-white transition-colors hover:bg-customDark/95">
          <GrHomeRounded className="mr-2 size-5" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
