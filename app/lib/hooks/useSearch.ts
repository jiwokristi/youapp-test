import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

interface SearchProps {
  isPagination?: boolean
}

export const useSearch = ({ isPagination = false }: SearchProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const searchHandler = useDebouncedCallback((value) => {
    const params = new URLSearchParams(searchParams)

    if (isPagination) {
      params.set('page', '1')
    }

    if (value) {
      params.set('query', value)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return {
    searchParams,
    searchHandler,
  }
}
