import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import JobApplyForm from "@/components/section/JobApplyForm";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Freeio - Apply for Job",
};

export default function JobApplyPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Breadcumb10 path={["Home", "Jobs", "Apply"]} />
      <JobApplyForm />
    </>
  );
} 