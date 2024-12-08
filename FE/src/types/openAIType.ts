export type Role = "user" | "assistant";
export interface ChatHistory {
    role: Role;
    content: string;
}