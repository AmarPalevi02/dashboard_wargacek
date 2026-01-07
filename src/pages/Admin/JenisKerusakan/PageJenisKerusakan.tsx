// import React, { useState } from 'react';
// import { useGetJenisKejadian } from './useGetJenisKejadian';
// import JenisKerusakanForm from './JenisKerusakanForm';
// import JenisKerusakanEditForm from './JenisKerusakanEditForm';
// import { JenisKerusakan } from './types';

// const PageJenisKerusakan: React.FC = () => {
//   const { data, loading, error, deleteJenisKejadian, refetch } = useGetJenisKejadian();
//   const [showForm, setShowForm] = useState(false);
//   const [editingItem, setEditingItem] = useState<JenisKerusakan | null>(null);
//   const [alert, setAlert] = useState<{
//     variant: "success" | "error" | "warning" | "info";
//     title: string;
//     message: string;
//   } | null>(null);

//   const handleEdit = (item: JenisKerusakan) => {
//     console.log('🔄 Edit button clicked', item);
//     setEditingItem(item);
//   };

//   const handleDelete = async (id: string, jenisKerusakan: string) => {
//     if (window.confirm(`Apakah Anda yakin ingin menghapus "${jenisKerusakan}"?`)) {
//       try {
//         const result = await deleteJenisKejadian(id);
//         if (result.success) {
//           setAlert({
//             variant: "success",
//             title: "Berhasil",
//             message: `Jenis kerusakan "${jenisKerusakan}" berhasil dihapus`
//           });
//         } else {
//           setAlert({
//             variant: "error",
//             title: "Error",
//             message: result.message
//           });
//         }
//       } catch (err: any) {
//         const errorMessage = err.response?.data?.message || "Gagal menghapus data";
//         setAlert({
//           variant: "error",
//           title: "Error",
//           message: errorMessage 
//         });
//       }
//     }
//   };

//   const handleFormSuccess = () => {
//     setShowForm(false);
//     setEditingItem(null);
//     refetch();
//     setAlert({
//       variant: "success",
//       title: "Berhasil",
//       message: "Data berhasil disimpan"
//     });
//   };

//   const handleFormCancel = () => {
//     setShowForm(false);
//     setEditingItem(null);
//   };

//   // Auto-hide alert after 5 seconds
//   React.useEffect(() => {
//     if (alert) {
//       const timer = setTimeout(() => {
//         setAlert(null);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [alert]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//         <div className="flex items-center">
//           <div className="text-red-600">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//           <div className="ml-3">
//             <h3 className="text-red-800 font-medium">Error</h3>
//             <p className="text-red-700 text-sm">{error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Alert Notification */}
//       {alert && (
//         <div className={`mb-6 rounded-lg p-4 ${
//           alert.variant === "success" ? "bg-green-50 border border-green-200" :
//           alert.variant === "error" ? "bg-red-50 border border-red-200" :
//           alert.variant === "warning" ? "bg-yellow-50 border border-yellow-200" :
//           "bg-blue-50 border border-blue-200"
//         }`}>
//           <div className="flex items-center">
//             <div className={`${
//               alert.variant === "success" ? "text-green-600" :
//               alert.variant === "error" ? "text-red-600" :
//               alert.variant === "warning" ? "text-yellow-600" :
//               "text-blue-600"
//             }`}>
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 {alert.variant === "success" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />}
//                 {alert.variant === "error" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
//                 {alert.variant === "warning" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />}
//                 {alert.variant === "info" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
//               </svg>
//             </div>
//             <div className="ml-3">
//               <h3 className={`text-sm font-medium ${
//                 alert.variant === "success" ? "text-green-800" :
//                 alert.variant === "error" ? "text-red-800" :
//                 alert.variant === "warning" ? "text-yellow-800" :
//                 "text-blue-800"
//               }`}>
//                 {alert.title}
//               </h3>
//               <p className={`text-sm ${
//                 alert.variant === "success" ? "text-green-700" :
//                 alert.variant === "error" ? "text-red-700" :
//                 alert.variant === "warning" ? "text-yellow-700" :
//                 "text-blue-700"
//               }`}>
//                 {alert.message}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         {/* Header */}
//         <div className="px-6 py-4 border-b border-gray-200">
//           <div className="flex justify-between items-center">
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800">Jenis Kerusakan</h2>
//               <p className="text-gray-600 text-sm mt-1">Daftar jenis kerusakan dan dinas terkait</p>
//             </div>
//             <button 
//               onClick={() => setShowForm(true)}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center"
//             >
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//               </svg>
//               Tambah Data
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Jenis Kerusakan
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Dinas
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Aksi
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {data.map((item, index) => (
//                 <tr 
//                   key={item.id} 
//                   className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100 transition-colors duration-150'}
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">
//                       {item.jenis_kerusakan}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
//                         {item.dinas.name}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleEdit(item)}
//                         className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors duration-200 flex items-center"
//                       >
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                         </svg>
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(item.id, item.jenis_kerusakan)}
//                         className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors duration-200 flex items-center"
//                       >
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                         </svg>
//                         Hapus
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Empty State */}
//         {data.length === 0 && (
//           <div className="text-center py-12">
//             <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada data</h3>
//             <p className="mt-1 text-sm text-gray-500">Belum ada jenis kerusakan yang terdaftar.</p>
//           </div>
//         )}
//       </div>

//       {/* Form Modal untuk Tambah */}
//       {showForm && (
//         <JenisKerusakanForm 
//           onSuccess={handleFormSuccess}
//           onCancel={handleFormCancel}
//         />
//       )}

//       {/* Form Modal untuk Edit */}
//       {editingItem && (
//         <JenisKerusakanEditForm 
//           item={editingItem}
//           onSuccess={handleFormSuccess}
//           onCancel={handleFormCancel}
//         />
//       )}
//     </>
//   );
// };

// export default PageJenisKerusakan;












import React, { useState } from 'react';
import { useGetJenisKejadian } from './useGetJenisKejadian';
import JenisKerusakanForm from './JenisKerusakanForm';
import JenisKerusakanEditForm from './JenisKerusakanEditForm';
import { JenisKerusakan } from './types';

const PageJenisKerusakan: React.FC = () => {
  const { data, loading, error, deleteJenisKejadian, refetch } = useGetJenisKejadian();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<JenisKerusakan | null>(null);
  const [alert, setAlert] = useState<{
    variant: "success" | "error" | "warning" | "info";
    title: string;
    message: string;
  } | null>(null);

  const handleEdit = (item: JenisKerusakan) => {
    console.log('🔄 Edit button clicked', item);
    setEditingItem(item);
  };

  const handleDelete = async (id: string, jenisKerusakan: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus "${jenisKerusakan}"?`)) {
      try {
        const result = await deleteJenisKejadian(id);
        if (result.success) {
          setAlert({
            variant: "success",
            title: "Berhasil",
            message: `Jenis kerusakan "${jenisKerusakan}" berhasil dihapus`
          });
        } else {
          setAlert({
            variant: "error",
            title: "Error",
            message: result.message
          });
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || "Gagal menghapus data";
        setAlert({
          variant: "error",
          title: "Error",
          message: errorMessage 
        });
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingItem(null);
    refetch();
    setAlert({
      variant: "success",
      title: "Berhasil",
      message: "Data berhasil disimpan"
    });
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  // Auto-hide alert after 5 seconds
  React.useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 sm:h-64">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
        <div className="flex items-start sm:items-center">
          <div className="text-red-600 flex-shrink-0 mt-0.5 sm:mt-0">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-red-800 font-medium text-sm sm:text-base">Error</h3>
            <p className="text-red-700 text-xs sm:text-sm mt-0.5">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Alert Notification */}
      {alert && (
        <div className={`mb-4 sm:mb-6 rounded-lg p-3 sm:p-4 ${
          alert.variant === "success" ? "bg-green-50 border border-green-200" :
          alert.variant === "error" ? "bg-red-50 border border-red-200" :
          alert.variant === "warning" ? "bg-yellow-50 border border-yellow-200" :
          "bg-blue-50 border border-blue-200"
        }`}>
          <div className="flex items-start sm:items-center">
            <div className={`flex-shrink-0 mt-0.5 sm:mt-0 ${
              alert.variant === "success" ? "text-green-600" :
              alert.variant === "error" ? "text-red-600" :
              alert.variant === "warning" ? "text-yellow-600" :
              "text-blue-600"
            }`}>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {alert.variant === "success" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />}
                {alert.variant === "error" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                {alert.variant === "warning" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />}
                {alert.variant === "info" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
              </svg>
            </div>
            <div className="ml-3">
              <h3 className={`text-xs sm:text-sm font-medium ${
                alert.variant === "success" ? "text-green-800" :
                alert.variant === "error" ? "text-red-800" :
                alert.variant === "warning" ? "text-yellow-800" :
                "text-blue-800"
              }`}>
                {alert.title}
              </h3>
              <p className={`text-xs sm:text-sm ${
                alert.variant === "success" ? "text-green-700" :
                alert.variant === "error" ? "text-red-700" :
                alert.variant === "warning" ? "text-yellow-700" :
                "text-blue-700"
              }`}>
                {alert.message}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-200">
          <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 xs:gap-0">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Jenis Kerusakan</h2>
              <p className="text-gray-600 text-xs sm:text-sm mt-0.5 sm:mt-1">Daftar jenis kerusakan dan dinas terkait</p>
            </div>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center w-full xs:w-auto"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm sm:text-base">Tambah Data</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-0 sm:mx-0">
          <table className="w-full min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Jenis Kerusakan
                </th>
                <th className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Dinas
                </th>
                <th className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr 
                  key={item.id} 
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100 transition-colors duration-150'}
                >
                  <td className="px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-4">
                    <div className="text-sm font-medium text-gray-900 break-words">
                      {item.jenis_kerusakan}
                    </div>
                  </td>
                  <td className="px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full truncate max-w-[120px] sm:max-w-none">
                        {item.dinas.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-4">
                    <div className="flex flex-col xs:flex-row gap-1.5 sm:gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg transition-colors duration-200 flex items-center justify-center text-xs sm:text-sm"
                      >
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span className="truncate">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.jenis_kerusakan)}
                        className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg transition-colors duration-200 flex items-center justify-center text-xs sm:text-sm"
                      >
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className="truncate">Hapus</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {data.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada data</h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">Belum ada jenis kerusakan yang terdaftar.</p>
          </div>
        )}
      </div>

      {/* Form Modal untuk Tambah */}
      {showForm && (
        <JenisKerusakanForm 
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}

      {/* Form Modal untuk Edit */}
      {editingItem && (
        <JenisKerusakanEditForm 
          item={editingItem}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}
    </>
  );
};

export default PageJenisKerusakan;