import { Button } from '@/components/ui/Button'

interface CodeProps {
  data: unknown
}

export const Code = ({ data }: CodeProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    alert('Copied to clipboard')
  }

  return (
    <code className="w-full relative rounded-lg">
      <Button
        className="absolute top-4 right-4"
        onClick={handleCopy}
        variant="secondary"
      >
        Copy Text
      </Button>
      <pre className="max-h-64 min-h-32 overflow-auto p-4 text-sm font-mono whitespace-pre-wrap">
        {JSON.stringify(data, null, 2)}
      </pre>
    </code>
  )
}
