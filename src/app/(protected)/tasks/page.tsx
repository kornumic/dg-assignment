const TasksPage = async () => {
  const tasks = await fetch("http://localhost:3000/api/tasks");
  const jsonTasks = await tasks.json();
  console.log(jsonTasks);

  return (
    <div>
      <h1>Tasks</h1>
      {/*<ul>*/}
      {/*  {tasks.map((task) => (*/}
      {/*    <li key={task.id}>{task.name}</li>*/}
      {/*  ))}*/}
      {/*</ul>*/}
    </div>
  );
};

export default TasksPage;
