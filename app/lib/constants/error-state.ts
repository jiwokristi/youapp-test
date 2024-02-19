export interface ErrorState {
  status?: number;
  message?: string;
}

export const errorState = {
  status: undefined,
  message: undefined,
} as ErrorState;
