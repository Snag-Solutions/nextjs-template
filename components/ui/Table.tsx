import { Button } from '@/components/ui/Button'

interface Column<T> {
  key: keyof T
  label: string
  render?: (item: T, index: number) => React.ReactNode
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  hasNextPage?: boolean
  isLoading?: boolean
  getRowKey: (item: T) => string | number
  loadMore?: () => void
}

export function Table<T>({
  data,
  columns,
  hasNextPage,
  isLoading,
  getRowKey,
  loadMore,
}: TableProps<T>) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-accent">
          {columns.map((col) => (
            <td key={`thead_${col.key as string}`} className="text-left p-2">
              {col.label}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={`${getRowKey(item)}_${index}`}
            className="border-b border-accent"
          >
            {columns.map((col) => (
              <td
                key={`${getRowKey(item)}_${col.key as string}`}
                className="p-2"
              >
                {col.render
                  ? col.render(item, index)
                  : String(item[col.key] ?? '')}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {loadMore ? (
        <tfoot>
          <tr>
            <td className="p-2" colSpan={columns.length}>
              <div className="flex items-center justify-center w-full">
                <Button
                  variant="secondary"
                  onClick={loadMore}
                  disabled={!hasNextPage || isLoading}
                >
                  {isLoading
                    ? 'Loading...'
                    : hasNextPage
                      ? 'Load More'
                      : 'No More Data'}
                </Button>
              </div>
            </td>
          </tr>
        </tfoot>
      ) : null}
    </table>
  )
}
