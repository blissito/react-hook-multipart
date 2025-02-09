// Set process.env.DEBUG = 'blissmo' to enable debug logging
export function debug(message: string, ...args: unknown[]): void {
  if (process.env.DEBUG === "blissmo") {
    console.debug(`react-hook-multipart-debug: ${message}`, ...args);
  }
}
