'use client';

import { useState, useEffect, useCallback } from 'react';
import { getEffectiveCurriculum } from '@/lib/db/store';
import { WeekCurriculum } from '@/lib/types';

export function useCurriculum(): {
  curriculum: WeekCurriculum[];
  refreshCurriculum: () => void;
} {
  const [curriculum, setCurriculum] = useState<WeekCurriculum[]>(() => getEffectiveCurriculum());

  const refreshCurriculum = useCallback(() => {
    setCurriculum(getEffectiveCurriculum());
  }, []);

  useEffect(() => {
    // Initial sync
    refreshCurriculum();

    const handleUpdate = () => {
      refreshCurriculum();
    };

    if (typeof window !== 'undefined') {
      const handleStorage = (e: StorageEvent) => {
        if (!e.key || e.key.includes('curriculum')) {
          refreshCurriculum();
        }
      };

      window.addEventListener('wordlab_curriculum_updated', handleUpdate);
      window.addEventListener('storage', handleStorage);
      return () => {
        window.removeEventListener('wordlab_curriculum_updated', handleUpdate);
        window.removeEventListener('storage', handleStorage);
      };
    }
  }, [refreshCurriculum]);

  return { curriculum, refreshCurriculum };
}
