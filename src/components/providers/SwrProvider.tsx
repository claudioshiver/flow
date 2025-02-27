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
      console.log('>>> error', error);
      console.log('>>> error.error', error.error);
      console.log('>>> error.errors', error.errors);
      console.log('>>> error.message', error.message);

      const response = error.error as ErrorResponse;

      const addError = (message: string) => addAlert({
        message,
        type: 'error',
        icon: <FontAwesomeIcon icon={faWarning}/>
      });

      if(response.errors) {
        response.errors.forEach((message) => addError(message))
      } else if(response.error) {
        addError(response.error)
      } else {
        addError(response.message || '')
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
