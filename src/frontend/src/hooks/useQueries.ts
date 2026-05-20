import { createActor } from "@/backend";
import type {
  Invoice,
  PlanConfig,
  Subscription,
  TeamMember,
  Transaction,
  UsageRecord,
  UserId,
} from "@/backend";
import type {
  BillingPeriod,
  PlanTier,
  TeamMemberStatus,
  UserProfile,
  UserRole,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useMySubscription() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Subscription | null>({
    queryKey: ["mySubscription"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMySubscription();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyInvoices() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Invoice[]>({
    queryKey: ["myInvoices"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyInvoices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyTransactions() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Transaction[]>({
    queryKey: ["myTransactions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyTransactions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePlans() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PlanConfig[]>({
    queryKey: ["plans"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPlans();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTeamMembers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<TeamMember[]>({
    queryKey: ["teamMembers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTeamMembers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyUsage(year: number, month: number) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UsageRecord | null>({
    queryKey: ["myUsage", year, month],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyUsage(BigInt(year), BigInt(month));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllInvoices() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Invoice[]>({
    queryKey: ["allInvoices"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInvoices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllTransactions() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Transaction[]>({
    queryKey: ["allTransactions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTransactions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useListAllUsers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfile[]>({
    queryKey: ["allUsers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllUsers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCancelSubscription() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      await actor.cancelMySubscription();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mySubscription"] });
    },
  });
}

export function useSetUserRole() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      role,
    }: { userId: UserId; role: UserRole }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.setUserRole(userId, role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    },
  });
}

export function useUpdateTeamMemberStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      memberId,
      status,
    }: {
      memberId: UserId;
      status: TeamMemberStatus;
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.updateTeamMemberStatus(memberId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    },
  });
}

export function useAdminSetSubscription() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      tier,
      billingPeriod,
    }: {
      userId: UserId;
      tier: PlanTier;
      billingPeriod: BillingPeriod;
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.adminSetSubscription(userId, tier, billingPeriod);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTransactions"] });
    },
  });
}
