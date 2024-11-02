import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { CitiesQueryParams, CitiesResponse } from './cities.types'

const defaultLimit = 140

const apiKey = '6b6fd19c1eef6e59f9f02090423fab01'

export const city = createApi({
    reducerPath: 'city',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.novaposhta.ua/v2.0/json' }),
    endpoints: (build) => ({
        getCities: build.query<CitiesResponse, Partial<CitiesQueryParams>>({
            query: (queryParams) => {
                return {
                    url: '/',
                    method: 'POST',
                    body: {
                        apiKey: apiKey,
                        modelName: 'Address',
                        calledMethod: 'getCities',
                        methodProperties: {
                            FindByString: queryParams.search,
                            Limit: defaultLimit
                        }
                    }
                }
            }
        })
    }),
    tagTypes: ['Cities']
})

export const { useGetCitiesQuery } = city
