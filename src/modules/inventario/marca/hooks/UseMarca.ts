import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { marcaService } from "../services/marcaService";
import type { MarcaCreateDTO, MarcaUpdateDTO } from "../models/marca";

const QUERY_KEY = "marcas";

export function useMarcas() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: marcaService.getAll,
  });

  return {
    marcas: data || [],
    isLoading,
    isError: !!error,
    error: error?.message,
    refresh: refetch,
  };
}

export function useMarcaDetail(id: number | null) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => marcaService.getById(id!),
    enabled: !!id,
  });

  return {
    marca: data,
    isLoading,
    isError: !!error,
    error: error?.message,
    refresh: refetch,
  };
}

export function useMarcasByNombre(nombre: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEY, "buscar", nombre],
    queryFn: () => marcaService.buscarPorNombre(nombre),
    enabled: nombre.length >= 2,
  });

  return {
    marcas: data || [],
    isLoading,
    isError: !!error,
    error: error?.message,
    refresh: refetch,
  };
}

export function useMarcaMutations() {
  const queryClient = useQueryClient();

  const invalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  };

  /* CREATE */
  const createMutation = useMutation({
    mutationFn: (data: MarcaCreateDTO) => marcaService.create(data),
    onSuccess: () => invalidateCache(),
  });

  /* UPDATE */
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: MarcaUpdateDTO }) =>
      marcaService.update(id, data),
    onSuccess: () => invalidateCache(),
  });

  /* DELETE */
  const deleteMutation = useMutation({
    mutationFn: (id: number) => marcaService.delete(id),
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

    // DELETE
    remove: deleteMutation.mutate,
    removeAsync: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error?.message,

    // Estado general
    isPending:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
}