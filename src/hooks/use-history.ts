"use client";

import { useState, useCallback, useRef } from "react";

interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

const STORAGE_KEY = "calcgraph3d-history";
const MAX_ENTRIES = 20;

function canUseStorage(): boolean {
  try {
    const t = "__test__";
    localStorage.setItem(t, t);
    localStorage.removeItem(t);
    return true;
  } catch {
    return false;
  }
}

function loadEntries(): HistoryEntry[] {
  if (!canUseStorage()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

function persist(entries: HistoryEntry[]) {
  if (!canUseStorage()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function useHistory() {
  const [entries, setEntries] = useState<HistoryEntry[]>(loadEntries);
  const storageAvailable = useRef(canUseStorage());

  const addEntry = useCallback((expression: string, result: string) => {
    setEntries((prev) => {
      const entry: HistoryEntry = {
        id: crypto.randomUUID(),
        expression,
        result,
        timestamp: Date.now(),
      };
      const next = [entry, ...prev].slice(0, MAX_ENTRIES);
      if (storageAvailable.current) persist(next);
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setEntries([]);
    if (storageAvailable.current) localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { entries, addEntry, clearHistory };
}
