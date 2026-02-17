import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile, CalculationResult, DailyLog, Page } from '../types';
import { calculateAll } from '../utils/formulas';
import { loadProfile, saveProfile, getTodayLog, saveDailyLog } from '../utils/storage';

interface UserContextType {
  profile: UserProfile | null;
  setProfile: (p: UserProfile) => void;
  calculations: CalculationResult | null;
  todayLog: DailyLog;
  setTodayLog: (log: DailyLog) => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfileState] = useState<UserProfile | null>(loadProfile);
  const [todayLog, setTodayLogState] = useState<DailyLog>(getTodayLog);
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    return loadProfile() ? 'dashboard' : 'calculator';
  });

  const calculations = profile
    ? calculateAll(profile.weight, profile.height, profile.age, profile.gender, profile.activityLevel, profile.goal)
    : null;

  const setProfile = useCallback((p: UserProfile) => {
    setProfileState(p);
    saveProfile(p);
  }, []);

  const setTodayLog = useCallback((log: DailyLog) => {
    setTodayLogState(log);
    saveDailyLog(log);
  }, []);

  useEffect(() => {
    const log = getTodayLog();
    setTodayLogState(log);
  }, [currentPage]);

  return (
    <UserContext.Provider value={{ profile, setProfile, calculations, todayLog, setTodayLog, currentPage, setCurrentPage }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
