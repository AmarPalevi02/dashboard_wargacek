import { StatusOption } from "./types";

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "PENDING":
      return "warning";
    case "VALIDATED":
      return "success";
    default:
      return "secondary";
  }
};

export const getStatusTextColor = (status: string): string => {
  switch (status) {
    case "PENDING":
      return "text-yellow-700 dark:text-yellow-300";
    case "VALIDATED":
      return "text-green-700 dark:text-green-300";
    default:
      return "text-gray-700 dark:text-gray-300";
  }
};

export const translateStatus = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    PENDING: "Menunggu",
    VALIDATED: "Ter-verivikasi",
  };
  return statusMap[status] || status;
};

export const statusOptions: StatusOption[] = [
  { value: "PENDING", label: "Menunggu" },
  { value: "VALIDATED", label: "Ter-verivikasi" },
];
