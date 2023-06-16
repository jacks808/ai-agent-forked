import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useRoute } from 'vue-router'

export function useBasicLayout() {
  const route = useRoute()
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMobile = breakpoints.smaller('sm')
  const { debug } = route.query as { debug: string }

  return { isMobile, debug }
}
