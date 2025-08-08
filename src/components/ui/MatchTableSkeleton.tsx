export default function MatchTableSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="responsive-table-wrapper">
        <table className="ultra-compact min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="h-3 bg-gray-300 rounded w-10"></div>
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="h-3 bg-gray-300 rounded w-16"></div>
              </th>
              <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="h-3 bg-gray-300 rounded w-10 mx-auto"></div>
              </th>
              <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="h-3 bg-gray-300 rounded w-10 mx-auto"></div>
              </th>
              <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="h-3 bg-gray-300 rounded w-16 mx-auto"></div>
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(10)].map((_, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {/* Date Cell */}
                <td className="whitespace-nowrap text-gray-500 py-2 px-2">
                  <div className="space-y-1">
                    <div className="h-3 bg-gray-300 rounded w-10"></div>
                    <div className="h-3 bg-gray-200 rounded w-6"></div>
                  </div>
                </td>

                {/* Team (Tournament) */}
                <td className="whitespace-nowrap py-2 px-2">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                </td>

                {/* Tiger */}
                <td className="whitespace-nowrap py-2 px-2 text-center">
                  <div className="h-4 bg-gray-300 rounded w-8 mx-auto"></div>
                </td>

                {/* Lion */}
                <td className="whitespace-nowrap py-2 px-2 text-center">
                  <div className="h-4 bg-gray-300 rounded w-8 mx-auto"></div>
                </td>

                {/* Winner */}
                <td className="whitespace-nowrap py-2 px-2 text-center">
                  <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
