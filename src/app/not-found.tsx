import { NotFoundCard } from "@/components/custom/error/NotFoundCard";

const notFound = () => {
  return (
    <div className="flex w-full justify-center my-24">
      <NotFoundCard />
    </div>
  );
};

export default notFound;
