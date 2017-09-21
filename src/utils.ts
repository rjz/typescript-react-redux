import * as React from 'react'

type RC = React.SFC | React.ComponentClass

type HOC = (C: RC) => RC

export const compose = (Component: RC, ...hocs: Array<HOC>) =>
  hocs.reduce((C, hoc) => hoc(C), Component)
