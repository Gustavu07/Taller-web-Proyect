import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { personalService } from "../services/personalService";
import type { PersonalCreateDTO, PersonalUpdateDTO } from "../models/Personal";

const QUERY_KEY = "personal";

export function usePersonal() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: personalService.getAll,
  });

  return {
    personal: data || [],
    isLoading,
    isError: !!error,
    error: error?.message,
    refresh: refetch,
  };
}

export function usePersonalBySucursal(sucursalId: number | null) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEY, "sucursal", sucursalId],
    queryFn: () => personalService.getBySucursalId(sucursalId!),
    enabled: !!sucursalId,
  });

  return {
    personal: data || [],
    isLoading,
    isError: !!error,
    error: error?.message,
    refresh: refetch,
  };
}

export function usePersonalDetail(id: number | null) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => personalService.getById(id!),
    enabled: !!id,
  });

  return {
    personal: data,
    isLoading,
    isError: !!error,
    error: error?.message,
    refresh: refetch,
  };
}

export function usePersonalMutations() {
  const queryClient = useQueryClient();

  const invalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  };

  // CREATE
  const createMutation = useMutation({
    mutationFn: (data: PersonalCreateDTO) => personalService.create(data),
    onSuccess: () => {
      invalidateCache();
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: PersonalUpdateDTO }) =>
      personalService.update(id, data),
    onSuccess: () => {
      invalidateCache();
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (id: number) => personalService.delete(id),
    onSuccess: () => {
      invalidateCache();
    },
  });

  // REASIGNAR SUCURSAL
  const reasignarMutation = useMutation({
    mutationFn: ({
      personalId,
      nuevaSucursalId,
    }: {
      personalId: number;
      nuevaSucursalId: number;
    }) => personalService.reasignarSucursal(personalId, nuevaSucursalId),
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

    reasignar: reasignarMutation.mutate,
    reasignarAsync: reasignarMutation.mutateAsync,
    isReasignando: reasignarMutation.isPending,
    reasignarError: reasignarMutation.error?.message,

    isPending:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending ||
      reasignarMutation.isPending,
  };
}
