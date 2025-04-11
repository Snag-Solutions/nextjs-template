/**
 * Decodes a JWT token without using external libraries
 * @param token The JWT token to decode
 * @returns The decoded payload as an object
 */
export function decodeJWT<T>(token: string): {
  data: T
  exp: number
  iat: number
} {
  try {
    // Split the token into its parts
    const parts = token.split('.')

    // Check if the token has the correct number of parts
    if (parts.length !== 3) {
      throw new Error('Invalid token format')
    }

    // Get the payload part (second part)
    const payload = parts[1]

    // Convert base64url to base64
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')

    // Add padding if needed
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      '='
    )

    // Decode base64 to string
    const jsonPayload = atob(padded)

    const parsedPayload = JSON.parse(jsonPayload) as {
      exp: number
      iat: number
      data: string
    }

    return {
      data: JSON.parse(parsedPayload.data) as T,
      exp: parsedPayload.exp,
      iat: parsedPayload.iat,
    }

    // Parse the JSON string to an object
    // return JSON.parse(jsonPayload) as T
  } catch (error) {
    console.error('Error decoding JWT:', error)
    throw new Error('Invalid token')
  }
}
