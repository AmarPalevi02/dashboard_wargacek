import React, { useState } from "react";
import DinasTable from "./DinasTable";
import { useDinasData } from "./useGetDatas";
import { Dinas } from "../types";
import Alert from "../../../components/ui/alert/Alert";
import Button from "../../../components/ui/button/Button";
import CreateDinasUserForm from "./CreateDinasUserForm";
import { deleteData} from "../../../utils/fetch";

const ManageDInas: React.FC = () => {
  const { data, loading, error, refetch } = useDinasData();
  const [alert, setAlert] = useState<{
    variant: "success" | "error" | "warning" | "info";
    title: string;
    message: string;
  } | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleDelete = async (id: string, username: string) => {
    console.log(id)
    console.log(username)
    if (
      !window.confirm(`Apakah Anda yakin ingin menghapus dinas "${username}"?`)
    ) {
      return;
    }

    try {
      await deleteData(`delet-user-dinas/${id}`);
      setAlert({
        variant: "success",
        title: "Berhasil",
        message: `Dinas "${username}" berhasil dihapus`,
      });
      refetch(); 
    } catch (err: any) {
      setAlert({
        variant: "error",
        title: "Error",
        message: err.message || "Gagal menghapus dinas",
      });
    }
  };


  const handleEdit = (dinas: Dinas) => {
    // Implement edit functionality here
    console.log("Edit dinas:", dinas);
  };

  const handleCreateSuccess = () => {
    setShowCreateForm(false);
    refetch(); // Refresh data setelah berhasil create
    setAlert({
      variant: "success",
      title: "Berhasil",
      message: "User DINAS berhasil dibuat",
    });
  };

  const handleCreateCancel = () => {
    setShowCreateForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Management Dinas</h1>
          <p className="mt-2 text-sm text-gray-600">
            Kelola data dinas dan pengguna yang terkait
          </p>
        </div>

        {/* Alert */}
        {alert && (
          <div className="mb-6">
            <Alert
              variant={alert.variant}
              title={alert.title}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-6">
            <Alert
              variant="error"
              title="Error"
              message={error}
              onClose={() => refetch()}
            />
          </div>
        )}

        {/* Tampilkan form atau tabel */}
        {showCreateForm ? (
          <CreateDinasUserForm
            onSuccess={handleCreateSuccess}
            onCancel={handleCreateCancel}
          />
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">
                      Total Dinas
                    </h3>
                    <p className="text-2xl font-semibold text-gray-900">
                      {data?.data?.length || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">
                      Total Pengguna
                    </h3>
                    <p className="text-2xl font-semibold text-gray-900">
                      {data?.data?.reduce(
                        (acc, dinas) => acc + dinas.users.length,
                        0
                      ) || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">
                      Role DINAS
                    </h3>
                    <p className="text-2xl font-semibold text-gray-900">
                      {data?.data?.reduce(
                        (acc, dinas) =>
                          acc +
                          dinas.users.filter((user) => user.role === "DINAS")
                            .length,
                        0
                      ) || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Daftar Dinas & Pengguna
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Daftar semua dinas dan pengguna yang terdaftar dalam
                      sistem
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      onClick={() => setShowCreateForm(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Tambah User
                    </Button>
                    <button
                      onClick={() => refetch()}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Refresh
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <DinasTable
                  data={data?.data || []}
                  loading={loading}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageDInas;
