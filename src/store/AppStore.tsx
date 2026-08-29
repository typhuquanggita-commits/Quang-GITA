import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from 'react';
import { loadState, saveState } from '../lib/storage';
import type { PersistedState } from '../types';
import { reducer, type Action } from './reducer';

interface StoreValue {
  state: PersistedState;
  dispatch: (action: Action) => void;
  /** false khi trinh duyet chan localStorage — UI canh bao nguoi dung. */
  persisted: boolean;
}

const StoreContext = createContext<StoreValue | null>(null);

const SAVE_DEBOUNCE_MS = 250;

export function AppStoreProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: PersistedState;
}) {
  const [state, dispatch] = useReducer(reducer, initialState, (seed) => seed ?? loadState());
  const persistedRef = useRef(true);
  const timerRef = useRef<number | undefined>(undefined);

  // Ghi co tri hoan: trong luc lam bai, moi giay deu co thay doi trang thai;
  // ghi thang xuong localStorage se gay giat khung hinh.
  useEffect(() => {
    if (timerRef.current !== undefined) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      persistedRef.current = saveState(state);
    }, SAVE_DEBOUNCE_MS);
    return () => {
      if (timerRef.current !== undefined) window.clearTimeout(timerRef.current);
    };
  }, [state]);

  // Dong bat buoc: dong tab giua chung bai thi khong duoc mat bai.
  useEffect(() => {
    const flush = () => {
      saveState(state);
    };
    window.addEventListener('pagehide', flush);
    document.addEventListener('visibilitychange', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      document.removeEventListener('visibilitychange', flush);
    };
  }, [state]);

  const value = useMemo<StoreValue>(
    () => ({ state, dispatch, persisted: persistedRef.current }),
    [state],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const value = useContext(StoreContext);
  if (!value) throw new Error('useStore phải được dùng bên trong <AppStoreProvider>.');
  return value;
}

export function useAppState(): PersistedState {
  return useStore().state;
}

export function useSettings() {
  return useStore().state.settings;
}

export function useDispatch(): (action: Action) => void {
  return useStore().dispatch;
}

/** Cap nhat cai dat kem kieu chat che cho tung truong. */
export function useUpdateSettings() {
  const dispatch = useDispatch();
  return useCallback(
    (patch: Partial<PersistedState['settings']>) => dispatch({ type: 'settings/update', patch }),
    [dispatch],
  );
}
