export function objectToSearchParams(
  obj: Record<string, any>
): URLSearchParams {
  const params = new URLSearchParams()

  for (const key in obj) {
    const value = obj[key]

    if (Array.isArray(value)) {
      value.forEach((v) => {
        // Skip undefined/null values
        if (v !== undefined && v !== null) {
          params.append(key, String(v))
        }
      })
    } else if (value !== undefined && value !== null) {
      params.append(key, String(value))
    }
  }

  return params
}
