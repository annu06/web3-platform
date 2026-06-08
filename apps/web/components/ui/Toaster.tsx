"use client";

import React, { createContext, useContext, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastCtx {
  toast: (t: Omit<Toast, "id">) => void;
  success: (title: string, description?: string) => void;
  error:   (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info:    (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastCtx | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <Toaster />");
  return ctx;
}

const ICONS: Record<ToastType, React.ElementType> = {
  success: CheckCircle,
  error:   XCircle,
  warning: AlertCircle,
  info:    Info,
};

const COLORS: Record<ToastType, string> = {
  success: "text-accent-green",
  error:   "text-red-400",
  warning: "text-yellow-400",
  info:    "text-brand-400",
};

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const Icon = ICONS[toast.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="glass-card px-4 py-3 flex items-start gap-3 min-w-[280px] max-w-[360px] shadow-lg"
    >
      <Icon className={cn("w-5 h-5 mt-0.5 shrink-0", COLORS[toast.type])} />
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium">{toast.title}</p>
        {toast.description && (
          <p className="text-white/50 text-xs mt-0.5 truncate">{toast.description}</p>
        )}
      </div>
      <button onClick={onClose} className="text-white/30 hover:text-white/70 transition-colors shrink-0">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((t: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { ...t, id }]);
    setTimeout(() => dismiss(id), 4000);
  }, [dismiss]);

  const ctx: ToastCtx = {
    toast:   addToast,
    success: (title, description) => addToast({ type: "success", title, description }),
    error:   (title, description) => addToast({ type: "error",   title, description }),
    warning: (title, description) => addToast({ type: "warning", title, description }),
    info:    (title, description) => addToast({ type: "info",    title, description }),
  };

  return (
    <ToastContext.Provider value={ctx}>
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map(t => (
            <ToastItem key={t.id} toast={t} onClose={() => dismiss(t.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
