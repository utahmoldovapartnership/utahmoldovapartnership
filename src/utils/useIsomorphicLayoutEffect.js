import { useEffect, useLayoutEffect } from 'react'

/** useLayoutEffect on the client; useEffect during SSR (avoids React hydration warnings). */
const useIsomorphicLayoutEffect = import.meta.env.SSR ? useEffect : useLayoutEffect

export default useIsomorphicLayoutEffect
