import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { loteService } from "../services/loteService";
import type { LoteCreateDTO, LoteUpdateDTO } from "../models/lote";

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

export function useLotesByProducto(productoId: number | null) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEY, "producto", productoId],
    queryFn: () => loteService.getByProductoId(productoId!),
    enabled: !!productoId,
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

  /* CREATE */
  const createMutation = useMutation({
    mutationFn: (data: LoteCreateDTO) => loteService.create(data),
    onSuccess: () => invalidateCache(),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: LoteUpdateDTO }) =>
      loteService.update(id, data),
    onSuccess: () => invalidateCache(),
  });
  const deleteMutation = useMutation({
    mutationFn: (id: number) => loteService.delete(id),
    onSuccess: () => invalidateCache(),
  });

  const activarMutation = useMutation({
    mutationFn: (id: number) => loteService.activarNotificacion(id),
    onSuccess: () => invalidateCache(),
  });
  const desactivarMutation = useMutation({
    mutationFn: (id: number) => loteService.desactivarNotificacion(id),
    onSuccess: () => invalidateCache(),
  });

  return {
    // CREATE
    create: createMutation.mutate,
    createAsync: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error?.message,

    // UPDATE
    update: updateMutation.mutate,
    updateAsync: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error?.message,

    remove: deleteMutation.mutate,
    removeAsync: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error?.message,

    activar: activarMutation.mutate,
    activarAsync: activarMutation.mutateAsync,
    isActivating: activarMutation.isPending,
    activarError: activarMutation.error?.message,

    desactivar: desactivarMutation.mutate,
    desactivarAsync: desactivarMutation.mutateAsync,
    isDeactivating: desactivarMutation.isPending,
    desactivarError: desactivarMutation.error?.message,

    // Estado general
    isPending:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending ||
      activarMutation.isPending ||
      desactivarMutation.isPending,
  };
}
