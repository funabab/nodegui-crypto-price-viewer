import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'

const API_BASE_URL = 'https://api.coingecko.com/api/v3'
const CONFIG_ASSET_IDS = 'asset_ids'
const CONFIG_CURRENCY = 'user_currrency'

const context = createContext(null)
const currenciesSymbol = { usd: '$', eur: '£', jpy: '¥', ngn: '₦' }
const currencies = Object.keys(currenciesSymbol)
const IntialState = {
  apiState: 'not-loaded',
  requestState: 'initial',
  coins: {
    ids: [],
    names: [],
    displayNames: [],
    symbols: [],
  },
  currency: 'usd',
  ids: [],
  assetsData: currencies.reduce((obj, currency) => {
    obj[currency] = []
    return obj
  }, {}),
}

const inArray = (what, arr) => {
  const index = arr.indexOf(what)
  return index > -1 ? index : undefined
}

export function APIProvider({ appConfig, children }) {
  const [
    { apiState, requestState, coins, currency, ids, assetsData },
    dispatch,
  ] = useReducer(Reducer, {
    ...IntialState,
    ids: appConfig.get(CONFIG_ASSET_IDS) || [],
    currency: appConfig.get(CONFIG_CURRENCY) || 'usd',
  })

  const currencySymbol = currenciesSymbol[currency]

  const assets = assetsData[currency]
    .filter((asset) => ids.indexOf(asset.id) !== -1)
    .sort((assetA, assetB) => ids.indexOf(assetB.id) - ids.indexOf(assetA.id)) // fix ordering to match how asset where added!
    .map((asset) => ({
      id: asset.id,
      name: asset.name,
      symbol: asset.symbol,
      price:
        currencySymbol +
        asset.current_price?.toLocaleString({
          style: 'currency',
        }),
      change: parseFloat(asset.price_change_percentage_24h?.toFixed(2)),
      market: {
        marketCap:
          currencySymbol +
          asset.market_cap?.toLocaleString({
            style: 'currency',
          }),
        marketHigh:
          currencySymbol +
          asset.high_24h?.toLocaleString({
            style: 'currency',
          }),
        marketLow:
          currencySymbol +
          asset.low_24h?.toLocaleString({
            style: 'currency',
          }),
      },
    }))

  const requestCoinsData = async () => {
    if (apiState !== 'not-loaded' && apiState !== 'error') {
      return
    }

    try {
      dispatch({ type: 'load-coins-data' })
      const { data } = await axios.get(`${API_BASE_URL}/coins/list`)
      dispatch({ type: 'loaded-coins-data', payload: data })
    } catch (err) {
      dispatch({ type: 'load-coins-data-error' })
    }
  }

  const refreshData = async () => {
    if (apiState === 'not-loaded' || apiState === 'error') {
      await requestCoinsData()
    }

    if (ids.length < 1) {
      dispatch({ type: 'no-asset-added' })
      return
    }

    try {
      const result = await Promise.all(
        [...currencies].map((currency) =>
          axios.get(`${API_BASE_URL}/coins/markets`, {
            params: {
              ids: ids.join(','),
              vs_currency: currency,
            },
          })
        )
      )

      const payload = result.reduce((obj, { data }, index) => {
        obj[currencies[index]] = data
        return obj
      }, {})

      dispatch({ payload, type: 'set-assets-data' })
    } catch (e) {
      dispatch({ type: 'set-assets-data-error' })
    }
  }

  useEffect(() => {
    refreshData()
  }, [ids])

  useEffect(() => {
    appConfig.set({ [CONFIG_ASSET_IDS]: ids, [CONFIG_CURRENCY]: currency })
  }, [ids, currency])

  return (
    <context.Provider
      value={{
        apiState,
        requestState,
        assets,
        refreshData,
        currency,
        setCurrency: (currency) => {
          if (currency in currenciesSymbol) {
            dispatch({ type: 'set-currency', payload: currency })
          }
        },
        addAsset: async (asset) => {
          const index =
            inArray(asset, coins.names) ||
            inArray(asset, coins.symbols) ||
            inArray(asset, coins.ids) ||
            undefined

          if (typeof index === 'undefined') {
            throw new Error('Asset not found')
          } else {
            if (ids.indexOf(coins.ids[index]) === -1) {
              dispatch({ type: 'add-asset', payload: coins.ids[index] })
            }
          }
        },
        removeAsset: (asset) => {
          dispatch({ type: 'remove-asset', payload: asset })
        },
      }}
    >
      {children}
    </context.Provider>
  )
}

const Reducer = (state, { type, payload }) => {
  switch (type) {
    case 'load-coins-data':
      return {
        ...state,
        apiState: 'not-loaded',
      }
    case 'loaded-coins-data':
      const ids = payload.map((coin) => coin.id)
      const names = payload.map((coin) => coin.name.toLowerCase())
      const displayNames = payload.map((coin) => coin.name)
      const symbols = payload.map((coin) => coin.symbol)

      return {
        ...state,
        coins: {
          ids,
          names,
          displayNames,
          symbols,
        },
        apiState: 'loaded',
      }
    case 'load-coins-data-error':
      return {
        ...state,
        apiState: 'error',
      }
    case 'no-asset-added':
      return {
        ...state,
        requestState: 'in-sync',
      }
    case 'set-assets-data':
      return {
        ...state,
        assetsData: payload,
        requestState: 'in-sync',
      }
    case 'set-assets-data-error':
      return {
        ...state,
        requestState: 'out-of-sync',
      }
    case 'set-currency':
      return {
        ...state,
        currency: payload,
      }
    case 'add-asset':
      return {
        ...state,
        ids: [...state.ids, payload],
      }
    case 'remove-asset':
      return {
        ...state,
        ids: [...state.ids].filter((id) => id !== payload),
      }
    default:
      throw new Error()
  }
}

export const APIContext = context
export const supportedCurrencies = currencies
