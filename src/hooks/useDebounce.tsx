"use client";
import { useEffect, useState } from "react";

/**
 *
 * @param value:string, debounce 시킬 keyword 입력
 * @param delay:number, debounce 주기 입력
 * @returns debounce 된 keyword 반환
 */

export default function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
