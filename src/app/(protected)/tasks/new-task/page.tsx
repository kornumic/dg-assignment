import { NewTaskForm } from "@/components/custom/tasks/forms/NewTaskForm";
import { FormCard } from "@/components/custom/form/FormCard";

const NewTaskPage = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex w-1/3">
        <FormCard
          cardTitle={"New Task"}
          cardDescription={"Fill the form to create new Task"}
        >
          <NewTaskForm />
        </FormCard>
      </div>
    </div>
  );
};

export default NewTaskPage;
