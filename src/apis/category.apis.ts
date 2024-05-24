import { Category } from '~/types/categories.types'
import { SuccessResponseApi } from '~/types/utils.type'
import http from '~/utils/http'

const URL = 'categories'

const categoryAPI = {
  getCategories() {
    return http.get<SuccessResponseApi<Category[]>>(URL)
  }
}

export default categoryAPI
