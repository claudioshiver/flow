'use client';

import {useAlertsContext} from "@/components/providers/AlertsProvider";
import Alert from "@/components/commons/Alert";
import {createPortal} from "react-dom";

const AlertMessages = () => {
  const { alerts, removeAlert } = useAlertsContext();

  return createPortal(
    <div className="fixed z-[60] inset-0 pointer-events-none z-messages">
      <div className="mt-header md:mt-header-md mx-auto xl:max-w-screen-2xl">
        <div className="px-2 pt-2 space-y-2 lg:w-1/4 ml-auto">
          {alerts.map((alert) => (
            <div key={alert.uuid} className="pointer-events-auto">
              <Alert
                label={alert.message}
                startIcon={alert.icon}
                color={alert.type}
                onClose={() => removeAlert(alert.uuid)}/>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default AlertMessages;
