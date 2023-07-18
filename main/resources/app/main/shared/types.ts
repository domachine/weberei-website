export interface AppContext {
  navigation: {
    reload(): void
    navigate(url: string, options?: { history?: 'replace' }): void
  }
  signal: AbortSignal
}
