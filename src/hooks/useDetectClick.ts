import { useEffect, useRef, useState } from "react";

export const useDetectClick = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const hookRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isActive) {
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isActive])

  const handleClick = (event: MouseEvent) => {
    if (
      hookRef.current
      && !hookRef.current.contains(event.target as Node)
    ) {
      setIsActive(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsActive(false);
    }
  };

  return {
    isActive,
    setIsActive,
    hookRef
  }
};