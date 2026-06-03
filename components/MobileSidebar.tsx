'use client';
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function MobileSidebar({children,}:{children: React.ReactNode}){
    const [open, setOpen] = useState(false);

    return (
        <>
        <button
            onClick={() => setOpen(true)}
            className="md:hidden text-white"
            >
            <Menu size={28} />
        </button>

         {open && (
            <div className="fixed inset-0 z-50 bg-black/60">
                <div className="w-72 h-full bg-slate-900 p-4">
                    <button
                        onClick={() => setOpen(false)}
                        className="text-white mb-4">
                      <X />
                    </button>
                    {children}
                </div>
            </div>
         )}
        </>
    );
}