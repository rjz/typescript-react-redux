export const api = {
  save: (counter: { value: number }): Promise<null> => {
    try {
      localStorage.setItem('__counterValue', counter.value.toString())
      return Promise.resolve(null)
    }
    catch (e) {
      return Promise.reject(e)
    }
  },
  load: (): Promise<{ value: number }> => {
    try {
      const value = parseInt(localStorage.getItem('__counterValue'), 10)
      return Promise.resolve({ value })
    }
    catch (e) {
      return Promise.reject(e)
    }
  },
}
