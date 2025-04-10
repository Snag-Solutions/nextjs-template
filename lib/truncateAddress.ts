/**
 * Truncate an address to the first 6 and last 4 characters
 *
 * @param {string} address - The address to truncate
 * @returns {string} - The truncated address
 */
function truncateAddress(address: string) {
  return address?.slice(0, 6) + '…' + address?.slice(-4)
}

export { truncateAddress }
