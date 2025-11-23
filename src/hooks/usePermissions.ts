// hooks/usePermissions.ts
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const usePermissions = () => {
  const { role, dinasName } = useSelector((state: RootState) => state.auth);

  const isAdmin = role === "ADMIN";
  const isDinas = role === "DINAS";
  const isUser = role === "USER";

  // Permission untuk ADMIN
  const canManageUsers = isAdmin;
  const canManageDinas = isAdmin;
  const canViewAllReports = isAdmin;
  const canManageSystem = isAdmin;

  // Permission untuk DINAS
  const canManageOwnReports = isDinas;
  const canValidateReports = isDinas;
  const canViewOwnDinasReports = isDinas;
  const canManageJenisKerusakan = isDinas;

  // Permission untuk USER
  const canCreateReports = isUser;
  const canViewPublicReports = isUser;
  const canVoteAndComment = isUser;

  return {
    role,
    dinasName,
    isAdmin,
    isDinas,
    isUser,
    // Admin permissions
    canManageUsers,
    canManageDinas,
    canViewAllReports,
    canManageSystem,
    // Dinas permissions
    canManageOwnReports,
    canValidateReports,
    canViewOwnDinasReports,
    canManageJenisKerusakan,
    // User permissions
    canCreateReports,
    canViewPublicReports,
    canVoteAndComment,
  };
};