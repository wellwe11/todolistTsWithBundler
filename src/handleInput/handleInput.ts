const handleInput = (e: Event) => {
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);

  const name = formData.get("formInput") as string;
  const date = formData.get("formDateInput") as string;
  const time = formData.get("formTimeInput") as string;

  form.reset();

  return { name, date, time };
};

export default handleInput;
