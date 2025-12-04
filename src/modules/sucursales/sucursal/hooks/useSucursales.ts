import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sucursalService } from "../services/sucursalService";
import type { SucursalCreateDTO, SucursalUpdateDTO } from "../models/Sucursal";

const QUERY_KEY = "sucursales";

export function useSucursales() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: sucursalService.getAll,
  });

  return {
    sucursales: data || [],
    isLoading,
    isError: !!error,
    error: error?.message,
    refresh: refetch,
  };
}

export function useSucursalDetail(id: number | null) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => sucursalService.getById(id!),
    enabled: !!id, // Solo ejecuta si hay ID
  });

  return {
    sucursal: data,
    isLoading,
    isError: !!error,
    error: error?.message,
    refresh: refetch,
  };
}

export function useSucursalMutations() {
  const queryClient = useQueryClient();

  const invalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  };

  const createMutation = useMutation({
    mutationFn: (data: SucursalCreateDTO) => sucursalService.create(data),
    onSuccess: () => {
      invalidateCache();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: SucursalUpdateDTO }) =>
      sucursalService.update(id, data),
    onSuccess: () => {
      invalidateCache();
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (id: number) => sucursalService.delete(id),
    onSuccess: () => {
      invalidateCache();
    },
  });

  const activarMutation = useMutation({
    mutationFn: (id: number) => sucursalService.activar(id),
    onSuccess: () => {
      invalidateCache();
    },
  });

  const desactivarMutation = useMutation({
    mutationFn: (id: number) => sucursalService.desactivar(id),
    onSuccess: () => {
      invalidateCache();
    },
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

    // DELETE
    remove: deleteMutation.mutate,
    removeAsync: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error?.message,

    // ACTIVAR
    activar: activarMutation.mutate,
    activarAsync: activarMutation.mutateAsync,
    isActivating: activarMutation.isPending,
    activarError: activarMutation.error?.message,

    // DESACTIVAR
    desactivar: desactivarMutation.mutate,
    desactivarAsync: desactivarMutation.mutateAsync,
    isDeactivating: desactivarMutation.isPending,
    desactivarError: desactivarMutation.error?.message,

    // Estado general de loading
    isPending:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending ||
      activarMutation.isPending ||
      desactivarMutation.isPending,
  };
}
