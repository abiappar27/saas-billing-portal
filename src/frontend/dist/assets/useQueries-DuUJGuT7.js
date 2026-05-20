import { s as useActor, t as useQuery, v as createActor } from "./index-CYPNVi4E.js";
function useMySubscription() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["mySubscription"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMySubscription();
    },
    enabled: !!actor && !isFetching
  });
}
function useMyInvoices() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myInvoices"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyInvoices();
    },
    enabled: !!actor && !isFetching
  });
}
function useMyTransactions() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myTransactions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyTransactions();
    },
    enabled: !!actor && !isFetching
  });
}
function useTeamMembers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["teamMembers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTeamMembers();
    },
    enabled: !!actor && !isFetching
  });
}
function useMyUsage(year, month) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myUsage", year, month],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyUsage(BigInt(year), BigInt(month));
    },
    enabled: !!actor && !isFetching
  });
}
function useAllInvoices() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["allInvoices"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInvoices();
    },
    enabled: !!actor && !isFetching
  });
}
function useAllTransactions() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["allTransactions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTransactions();
    },
    enabled: !!actor && !isFetching
  });
}
function useListAllUsers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllUsers();
    },
    enabled: !!actor && !isFetching
  });
}
export {
  useAllTransactions as a,
  useListAllUsers as b,
  useTeamMembers as c,
  useMyUsage as d,
  useMyInvoices as e,
  useMyTransactions as f,
  useMySubscription as g,
  useAllInvoices as u
};
