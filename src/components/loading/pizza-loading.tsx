"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function PizzaLoading() {
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <Loader2 className="w-16 h-16 text-orange-pizza" />
      </motion.div>
      <div className="mt-4 flex space-x-1">
        <motion.span
          className="w-2 h-2 bg-orange-pizza rounded-full"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
            delay: 0,
          }}
        ></motion.span>
        <motion.span
          className="w-2 h-2 bg-orange-pizza rounded-full"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
            delay: 0.2,
          }}
        ></motion.span>
        <motion.span
          className="w-2 h-2 bg-orange-pizza rounded-full"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
            delay: 0.4,
          }}
        ></motion.span>
      </div>
    </div>
  );
}
