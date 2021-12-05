import { toast, ToastOptions } from 'react-toastify';

export function useToast() {
  return {
    success: (content: string, options?: ToastOptions) =>
      toast(content, { ...options, type: 'success' }),

    warn: (content: string, options?: ToastOptions) =>
      toast(content, { ...options, type: 'warning' }),

    error: (content: string, options?: ToastOptions) =>
      toast(content, { ...options, type: 'error' }),

    normal: (content: string, options?: ToastOptions) =>
      toast(content, { ...options, type: 'default' }),
  };
}
