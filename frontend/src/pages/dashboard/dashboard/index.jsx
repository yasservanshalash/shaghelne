import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import DashboardInfo from "../../../components/dashboard/section/DashboardInfo";
import MetaComponent from "../../../components/common/MetaComponent";

const metadata = {
  title: "Freeio - Freelance Marketplace ReactJs Template | Dashboard",
};

export default function DasbPageDashboard() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboardLayout>
        <DashboardInfo />
      </DashboardLayout>
    </>
  );
}
