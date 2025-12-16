const handleInput = (e: Event): string => {
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);

  const value = formData.values().next().value as string;
  form.reset();

  return value;
};

export default handleInput;
