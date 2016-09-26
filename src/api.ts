// Simulate a flaky API around otherwise an otherwise synchronous `f()`.
const flakify = <T>(f: () => T): Promise<T> =>
  new Promise((resolve, reject) =>
    // We'll always take 200 * (1d10 + 1) ms to respond
    window.setTimeout(() => {
      try {

        // And ~20% of the time we'll fail
        if (Math.random() < 0.2) {
          throw new Error('Failed arbitrarily')
        }

        resolve(f())
      }
      catch (e) {
        return reject(e)
      }
    }, 200 + Math.random() * 2000)
  )

export const api = {
  save: (counter: { value: number }): Promise<null> => flakify(() => {
      localStorage.setItem('__counterValue', counter.value.toString())
      return null
    }),
  load: (): Promise<{ value: number }> => flakify(() => {
      const value = parseInt(localStorage.getItem('__counterValue'), 10)
      return { value }
    }),
}
