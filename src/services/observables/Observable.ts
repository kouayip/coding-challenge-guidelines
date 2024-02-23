export interface Observable<T = unknown> {
  subscribe: (
    onEvent: (data: T) => void,
    onError?: (err: unknown) => void,
  ) => void
  unsubscribe: () => void
}
