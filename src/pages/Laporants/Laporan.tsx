import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import TableLaporan from "./TableLaporan";

const Laporan = () => {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Laporan" />
      <div className="space-y-6">
        <ComponentCard title="Laporan ">
          <TableLaporan />
        </ComponentCard>
      </div>
    </>
  );
};

export default Laporan;
