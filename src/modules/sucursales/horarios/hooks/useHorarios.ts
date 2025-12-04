import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { horarioService } from "../services/horarioService";
import type { HorarioCreateDTO, HorarioUpdateDTO } from "../models/Horario";

const QUERY_KEY = "horarios";

export function useHorarios() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: horarioService.getAll,
  });

  return {
    horarios: data || [],
    isLoading,
    isError: !!error,
    error: error?.message,
    refresh: refetch,
  };
}

export function useHorarioDetail(id: number | null) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => horarioService.getById(id!),
    enabled: !!id, // Solo ejecuta si hay ID
  });

  return {
    horario: data,
    isLoading,
    isError: !!error,
    error: error?.message,
    refresh: refetch,
  };
}

export function useHorariosBySucursal(sucursalId: number | null) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEY, "sucursal", sucursalId],
    queryFn: () => horarioService.getBySucursalId(sucursalId!),
    enabled: !!sucursalId, // Solo ejecuta si hay sucursalId
  });

  return {
    horarios: data || [],
    isLoading,
    isError: !!error,
    error: error?.message,
    refresh: refetch,
  };
}

export function useHorarioMutations() {
  const queryClient = useQueryClient();

  const invalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  };

  const createMutation = useMutation({
    mutationFn: (data: HorarioCreateDTO) => horarioService.create(data),
    onSuccess: () => {
      invalidateCache();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: HorarioUpdateDTO }) =>
      horarioService.update(id, data),
    onSuccess: () => {
      invalidateCache();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => horarioService.delete(id),
    onSuccess: () => {
      invalidateCache();
    },
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

    isPending:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
}
