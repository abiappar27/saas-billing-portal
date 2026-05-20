import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface BillingAddress {
    country: string;
    city: string;
    postalCode: string;
    line1: string;
    line2?: string;
    state?: string;
}
export interface UsageRecord {
    month: bigint;
    userId: UserId;
    year: bigint;
    apiCallCount: bigint;
}
export interface Invoice {
    id: string;
    status: InvoiceStatus;
    userId: UserId;
    downloadData?: string;
    createdAt: Timestamp;
    description: string;
    amountCents: bigint;
    stripeInvoiceId?: string;
    currency: string;
    paidAt?: Timestamp;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Transaction {
    id: string;
    status: TransactionStatus;
    userId: UserId;
    createdAt: Timestamp;
    description: string;
    amountCents: bigint;
    currency: string;
    stripePaymentIntentId: string;
}
export type UserId = Principal;
export interface Subscription {
    status: SubscriptionStatus;
    nextBillingDate: Timestamp;
    stripeSubscriptionId?: string;
    userId: UserId;
    tier: PlanTier;
    billingPeriod: BillingPeriod;
    stripeCustomerId?: string;
    startDate: Timestamp;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface PlanConfig {
    features: Array<string>;
    annualPriceCents: bigint;
    monthlyPriceCents: bigint;
    name: string;
    tier: PlanTier;
    description: string;
    apiCallLimit: bigint;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface TeamMember {
    status: TeamMemberStatus;
    joinDate: Timestamp;
    name: string;
    role: UserRole;
    invitedBy: UserId;
    email: string;
    principalId: UserId;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface UserProfile {
    billingAddress?: BillingAddress;
    userId: UserId;
    name: string;
    createdAt: Timestamp;
    role: UserRole;
    email: string;
}
export enum BillingPeriod {
    annual = "annual",
    monthly = "monthly"
}
export enum InvoiceStatus {
    pending = "pending",
    paid = "paid",
    refunded = "refunded",
    failed = "failed"
}
export enum PlanTier {
    pro = "pro",
    enterprise = "enterprise",
    free = "free"
}
export enum SubscriptionStatus {
    active = "active",
    cancelled = "cancelled",
    pastDue = "pastDue",
    trialing = "trialing"
}
export enum TeamMemberStatus {
    active = "active",
    pending = "pending",
    suspended = "suspended"
}
export enum TransactionStatus {
    pending = "pending",
    refunded = "refunded",
    failed = "failed",
    succeeded = "succeeded"
}
export enum UserRole {
    manager = "manager",
    admin = "admin",
    customer = "customer"
}
export enum UserRole__1 {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    adminSetSubscription(userId: UserId, tier: PlanTier, billingPeriod: BillingPeriod): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole__1): Promise<void>;
    cancelMySubscription(): Promise<void>;
    confirmPayment(sessionId: string, tier: PlanTier, billingPeriod: BillingPeriod): Promise<Transaction>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    getAllInvoices(): Promise<Array<Invoice>>;
    getAllTransactions(): Promise<Array<Transaction>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole__1>;
    getMyInvoice(invoiceId: string): Promise<Invoice | null>;
    getMyInvoices(): Promise<Array<Invoice>>;
    getMySubscription(): Promise<Subscription | null>;
    getMyTransactions(): Promise<Array<Transaction>>;
    getMyUsage(year: bigint, month: bigint): Promise<UsageRecord | null>;
    getPlans(): Promise<Array<PlanConfig>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getTeamMembers(): Promise<Array<TeamMember>>;
    getUserProfile(userId: UserId): Promise<UserProfile | null>;
    getUserSubscription(userId: UserId): Promise<Subscription | null>;
    getUserUsage(userId: UserId, year: bigint, month: bigint): Promise<UsageRecord | null>;
    inviteTeamMember(memberId: UserId, name: string, email: string, role: UserRole): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    listAllUsers(): Promise<Array<UserProfile>>;
    recordApiCall(): Promise<void>;
    removeTeamMember(memberId: UserId): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    setUserRole(userId: UserId, role: UserRole): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateTeamMemberStatus(memberId: UserId, status: TeamMemberStatus): Promise<void>;
}
