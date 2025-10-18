//create a zustand store for tracking dynamic query parameters
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/*
 * Example Usage:
 *
 * // Load parameters from URL search params
 * const searchParams = new URLSearchParams(window.location.search);
 * useQueryParamsStore.getState().loadFromUrlParams(searchParams);
 *
 * // Or manually set individual parameters
 * useQueryParamsStore.getState().setParam('token', 'abc123');
 * useQueryParamsStore.getState().setParam('partner', 'partner-id');
 * useQueryParamsStore.getState().setParam('redirect', '/dashboard');
 *
 * // Retrieve parameters
 * const token = useQueryParamsStore.getState().getParam('token');
 * const partner = useQueryParamsStore.getState().getParam('partner');
 *
 * // Set multiple parameters at once
 * useQueryParamsStore.getState().setParams({
 *   token: 'abc123',
 *   partner: 'partner-id',
 *   redirect: '/dashboard',
 *   customParam: 'some-value'
 * });
 *
 * // Use in components with the hook
 * const { getParam, setParam, loadFromUrlParams } = useQueryParamsStore((state) => state);
 * const redirectUrl = getParam('redirect');
 */

type QueryParams = Record<string, string>;

// Helper function to parse URL search params
export const parseUrlParams = (
  searchParams: URLSearchParams | string
): QueryParams => {
  const params: QueryParams = {};
  const urlSearchParams =
    typeof searchParams === 'string'
      ? new URLSearchParams(searchParams)
      : searchParams;

  urlSearchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
};

type QueryParamsState = {
  // Dynamic query parameters storage
  params: QueryParams;
  setParam: (key: string, value: string) => void;
  setParams: (params: QueryParams) => void;
  getParam: (key: string) => string | undefined;
  removeParam: (key: string) => void;
  clearParams: () => void;
  loadFromUrlParams: (searchParams: URLSearchParams | string) => void;
  hasParam: (key: string) => boolean;
  getAllParams: () => QueryParams;
};

export const useQueryParamsStore = create(
  persist<QueryParamsState>(
    (set: any, get: any) => ({
      // Query parameters state
      params: {},
      setParam: (key: string, value: string) => {
        set((state: QueryParamsState) => ({
          params: {
            ...state.params,
            [key]: value,
          },
        }));
      },
      setParams: (params: QueryParams) => {
        set({ params });
      },
      getParam: (key: string) => {
        return get().params[key];
      },
      removeParam: (key: string) => {
        set((state: QueryParamsState) => {
          const newParams = { ...state.params };
          delete newParams[key];
          return { params: newParams };
        });
      },
      clearParams: () => {
        set({ params: {} });
      },
      loadFromUrlParams: (searchParams: URLSearchParams | string) => {
        const params = parseUrlParams(searchParams);
        set({ params });
      },
      hasParam: (key: string) => {
        return Boolean(get().params[key]);
      },
      getAllParams: () => {
        return get().params;
      },
    }),
    {
      name: 'query-params-store', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);
