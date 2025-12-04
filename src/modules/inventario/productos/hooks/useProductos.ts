import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productoService } from "../services/productoService";
import type { ProductoCreateDTO, ProductoUpdateDTO } from "../models/Producto";

const QUERY_KEY = "productos";

export function useProductos() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: productoService.getAll,
  });

  return {
    productos: data || [],
    isLoading,
    isError: !!error,
    error: error?.message,
    refresh: refetch,
  };
}

export function useProductosByMarca(marcaId: number | null) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEY, "marca", marcaId],
    queryFn: () => productoService.getByMarcaId(marcaId!),
    enabled: !!marcaId,
  });

  return {
    productos: data || [],
    isLoading,
    isError: !!error,
    error: error?.message,
    refresh: refetch,
  };
}

export function useProductoDetail(id: number | null) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => productoService.getById(id!),
    enabled: !!id,
  });

  return {
    producto: data,
    isLoading,
    isError: !!error,
    error: error?.message,
    refresh: refetch,
  };
}

export function useProductoMutations() {
  const queryClient = useQueryClient();

  const invalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  };

  // CREATE
  const createMutation = useMutation({
    mutationFn: (data: ProductoCreateDTO) => productoService.create(data),
    onSuccess: () => {
      invalidateCache();
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductoUpdateDTO }) =>
      productoService.update(id, data),
    onSuccess: () => {
      invalidateCache();
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (id: number) => productoService.delete(id),
    onSuccess: () => {
      invalidateCache();
    },
  });

  // ACTIVAR
  const activarMutation = useMutation({
    mutationFn: (id: number) => productoService.activar(id),
    onSuccess: () => {
      invalidateCache();
    },
  });

  // DESACTIVAR
  const desactivarMutation = useMutation({
    mutationFn: (id: number) => productoService.desactivar(id),
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
