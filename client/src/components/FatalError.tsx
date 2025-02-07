interface FatalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export function FatalError(props: FatalErrorProps) {
  return (
    <div
      id="__se_custom_error_boundary"
      className="px-3 max-w-screen-xl mx-auto"
    >
      <div className="flex flex-col gap-y-2.5 items-center">
        <h2 className="text-2xl">Something made an oopsie</h2>
        <span>{props.error.message}</span>
      </div>

      <div className="px-4 py-3 rounded-md border space-y-2">
        <details>
          <summary className="cursor-pointer">
            <strong>Stack trace</strong>
          </summary>
          <pre className="overflow-x-auto">
            <code>{props.error.stack}</code>
          </pre>
        </details>
        <div>
          <strong>{"Digest: "}</strong>
          <span>{props.error.digest}</span>
        </div>
      </div>
    </div>
  )
}
