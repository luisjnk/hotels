import React from 'react';
import './StatusMessage.css';

interface StatusMessageProps {
  message: string;
  statusType: StatusTypes;
}
export enum StatusTypes {
  Error = 'Error',
  Success_Load = 'Success_Load',
  Success_Insert = 'Success_Insert',
  NoStatus = 'NoStatus',
}

const StatusMessage: React.FC<StatusMessageProps> = ({ message, statusType }) => {
  if(statusType === StatusTypes.NoStatus) { return null; }
  if(statusType === StatusTypes.Success_Load) { return null; }

  return (
    <div className={statusType === StatusTypes.Error ? "error-container" : "success-container"}>
      <p className={statusType === StatusTypes.Error  ? "error-message" : "success-message"}>{message}</p>
    </div>
  );
};

export default StatusMessage;