import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { asignacionCorporativaService } from "../services/asignacionCorporativaService";
import type {
  AsignacionCorporativaCreateDTO,
  AsignacionCorporativaUpdateDTO,
} from "../models/AsignacionCorporativa";

const QUERY_KEY = "asignaciones-corporativas";

export function useAsignacionesCorporativas() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: asignacionCorporativaService.getAll,
  });

  return {
    asignaciones: data || [],
    isLoading,
    isError: !!error,
    error: error?.message,
    refresh: refetch,
  };
}

// Obtener detalle por ID
export function useAsignacionCorporativaDetail(id: number | null) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => asignacionCorporativaService.getById(id!),
    enabled: !!id,
  });

  return {
    asignacion: data,
    isLoading,
    isError: !!error,
    error: error?.message,
    refresh: refetch,
  };
}

export function useAsignacionCorporativaMutations() {
  const queryClient = useQueryClient();

  const invalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  };

  const createMutation = useMutation({
    mutationFn: (data: AsignacionCorporativaCreateDTO) =>
      asignacionCorporativaService.create(data),
    onSuccess: () => invalidateCache(),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: AsignacionCorporativaUpdateDTO;
    }) => asignacionCorporativaService.update(id, data),
    onSuccess: () => invalidateCache(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => asignacionCorporativaService.delete(id),
    onSuccess: () => invalidateCache(),
  });

  const desactivarMutation = useMutation({
    mutationFn: (id: number) => asignacionCorporativaService.desactivar(id),
    onSuccess: () => invalidateCache(),
  });

  return {
    create: createMutation.mutate,
    createAsync: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error?.message,

    update: updateMutation.mutate,
    updateAsync: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error?.message,

    remove: deleteMutation.mutate,
    removeAsync: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error?.message,

    desactivar: desactivarMutation.mutate,
    desactivarAsync: desactivarMutation.mutateAsync,
    isDeactivating: desactivarMutation.isPending,
    desactivarError: desactivarMutation.error?.message,

    isPending:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending ||
      desactivarMutation.isPending,
  };
}
