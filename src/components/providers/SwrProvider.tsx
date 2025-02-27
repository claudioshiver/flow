'use client';

import type {ReactNode} from 'react';
import {useMemo} from 'react';
import {faWarning} from '@fortawesome/free-solid-svg-icons/faWarning';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {SWRConfiguration} from 'swr';
import {SWRConfig} from 'swr';
import {useAlertsContext} from "@/components/providers/AlertsProvider";
import ErrorResponse from "@/lib/types/ErrorResponse";

const SwrProvider = function ({children}: { children: ReactNode }) {
  const {addAlert} = useAlertsContext();

  const options = useMemo(() => ({
    onError: (error: any) => {
      console.log('>>> error:', error);
      console.log('>>> error.response:', error.response);
      console.log('>>> error.response.data:', error.response.data);

      const response = error.response.data as ErrorResponse;

      const addError = (message: string) => addAlert({
        message,
        type: 'error',
        icon: <FontAwesomeIcon icon={faWarning}/>
      });

      if(response.errors) {
        response.errors.forEach((message) => addError(message))
      } else {
        addError(response.error!)
      }
    }
  } as SWRConfiguration), [addAlert]);

  return (
    <SWRConfig value={options}>
      {children}
    </SWRConfig>
  );
};

export default SwrProvider;
