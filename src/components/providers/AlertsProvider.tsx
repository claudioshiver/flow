'use client';

import type { ReactNode} from 'react';
import { useCallback, useEffect, useState } from 'react';
import { createContext, useContext,useMemo} from "react";
import { usePathname } from 'next/navigation';
import { v4 as uuid } from 'uuid';

export type AlertItem = {
    uuid: string;
    message: string;
    type?: 'error' | 'warning' | 'primary' | 'success';
    icon?: ReactNode;
    timeout?: number;
}

export type AlertsContextType = {
    alerts: AlertItem[],
    addAlert: (alert: Omit<AlertItem, 'uuid'>) => void;
    removeAlert: (uuid: string) => void;
    clearAlerts: () => void;
}

const AlertsContext = createContext<AlertsContextType>({
    alerts: [],
    addAlert: () => undefined,
    removeAlert: () => undefined,
    clearAlerts: () => undefined,
});

const AlertsProvider = function({children}: { children: ReactNode }) {
    const [alerts, setAlerts] = useState<AlertItem[]>([]);
    const pathname = usePathname();

    const clearAlerts = useCallback(() => {
        setAlerts([]);
    }, []);

    const removeAlert = useCallback((uuid: string) => {
        setAlerts((prev) => prev.filter((alert) => alert.uuid !== uuid));
    }, []);

    const addAlert = useCallback((alert: Omit<AlertItem, 'uuid'>) => {
        const item = { ...alert, uuid: uuid() };
        setAlerts((prev) => [...prev, item]);
        if(alert.timeout) setTimeout(() => removeAlert(item.uuid), alert.timeout);
    }, [removeAlert]);

    const context = useMemo(() => ({
        alerts,
        addAlert,
        removeAlert,
        clearAlerts,
    }), [alerts, addAlert, removeAlert, clearAlerts]);

    useEffect(() => {
        clearAlerts();
    }, [pathname]); // eslint-disable-line

    return (
        <AlertsContext.Provider value={context}>
            {children}
        </AlertsContext.Provider>
    );
}

export const useAlertsContext = function() {
    const context = useContext(AlertsContext);
    if(!context) throw new Error('useAlertsContext must be used within a AlertsProviderClient');
    return context;
}

export default AlertsProvider;
