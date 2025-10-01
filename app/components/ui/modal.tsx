import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  isOpen,
  onClose,
  title,
  close,
  children,
  className,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark-900/50 backdrop-blur-sm z-[9998]"
        onClick={onClose}
        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* Modal Container - Always Centered */}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4"
        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <div
          className={`bg-dark-800 rounded-2xl sm:rounded-[32px] border border-dark-600 shadow-2xl p-4 sm:p-6 
            w-full max-w-[95vw] sm:max-w-[500px] max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden ${className || ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[18px] font-semibold text-white">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="text-white hover:opacity-80"
              >
                <X size={24} />
              </button>
            </div>
          )}
          {close && (
            <button
              onClick={onClose}
              className="text-white hover:opacity-80"
            >
              <X size={24} />
            </button>
          )}
          <div className="overflow-y-auto custom-scrollbar flex-1">
            {children}
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
}
