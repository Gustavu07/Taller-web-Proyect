import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { loteService } from "../services/loteService";
import type { LoteCreateDTO } from "../models/lote";

const QUERY_KEY = "lotes";

export function useLotes() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: loteService.getAll,
  });

  return {
    lotes: data || [],
    isLoading,
    isError: !!error,
    error: error?.message,
    refresh: refetch,
  };
}

export function useLoteDetail(id: number | null) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => loteService.getById(id!),
    enabled: !!id,
  });

  return {
    lote: data,
    isLoading,
    isError: !!error,
    error: error?.message,
    refresh: refetch,
  };
}

export function useLoteMutations() {
  const queryClient = useQueryClient();

  const invalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  };

  const createMutation = useMutation({
    mutationFn: (data: LoteCreateDTO) => loteService.create(data),
    onSuccess: () => invalidateCache(),
  });
  const toggleNotificacionMutation = useMutation({
    mutationFn: ({ id, enabled }: { id: number; enabled: boolean }) =>
      loteService.toggleNotificacion(id, enabled),
    onSuccess: () => invalidateCache(),
  });

  // ✅ DAR DE BAJA (del backend)
  const darDeBajaMutation = useMutation({
    mutationFn: (id: number) => loteService.darDeBaja(id),
    onSuccess: () => invalidateCache(),
  });

  return {
    // CREATE
    create: createMutation.mutate,
    createAsync: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error?.message,

    toggleNotificacion: toggleNotificacionMutation.mutate,
    toggleNotificacionAsync: toggleNotificacionMutation.mutateAsync,
    isTogglingNotificacion: toggleNotificacionMutation.isPending,
    toggleNotificacionError: toggleNotificacionMutation.error?.message,

    // ✅ DAR DE BAJA
    darDeBaja: darDeBajaMutation.mutate,
    darDeBajaAsync: darDeBajaMutation.mutateAsync,
    isDandoDeBaja: darDeBajaMutation.isPending,
    darDeBajaError: darDeBajaMutation.error?.message,

    // Estado general
    isPending:
      createMutation.isPending ||
      toggleNotificacionMutation.isPending ||
      darDeBajaMutation.isPending,
  };
}
