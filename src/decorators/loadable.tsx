import * as React from 'react'

export default function loadable<P>(isLoading: (p: P) => boolean) {
  return (C: React.ComponentClass<P>|React.SFC<P>) => {
    const LoadableComponent: React.SFC<P> = (props) => {
      if (isLoading(props)) {
        return <div>Just a moment, please...</div>
      }
      return <C {...props} />
    }

    // Set pretty `displayName` for dev tooling
    LoadableComponent.displayName = `Loadable(${C.name})`
    return LoadableComponent
  }
}
