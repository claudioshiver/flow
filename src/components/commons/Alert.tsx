'use client';

import {ReactNode, useMemo} from 'react';
import React from 'react';
import cn from 'classnames';
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export type AlertProps = Readonly<{
    label: string;
    startIcon?: ReactNode;
    color?: 'error' | 'warning' | 'primary' | 'success';
    fullWidth?: boolean;
    onClose?: () => void;
}>;

const Alert = (props: AlertProps) => {
    const {
        color = 'error',
        fullWidth,
    } = props;

    const alertClass = useMemo(() => (
      cn('flex text-gray-800 rounded-md leading-none p-4 gap-3 justify-start items-center border-b-2', {
          'w-full': fullWidth,
          'border-primary bg-primary-light': color === 'primary',
          'border-error bg-error-light': color === 'error',
          'border-warning bg-warning-light': color === 'warning',
          'border-success bg-success-light': color === 'success',
      })
    ), [fullWidth, color]);

    return (
        <div className={alertClass}>
            {props.startIcon}
            <span className="flex-grow">
                {props.label}
            </span>
            {props.onClose && (
                <FontAwesomeIcon
                    icon={faTimes}
                    onClick={props.onClose}
                    className="cursor-pointer"/>
            )}
        </div>
    );
};

export default Alert;
