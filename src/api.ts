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

export type Api = {
  save(x: { value: number }): Promise<{}>,
  load(): (Promise<{ value: number }>),
}

export const api: Api = {
  save: counter => flakify(() => {
      localStorage.setItem('__counterValue', counter.value.toString())
      return {}
    }),
  load: () => flakify(() => {
      const storedValue = parseInt(localStorage.getItem('__counterValue'), 10)
      return {
        value: storedValue || 0,
      }
    }),
}
