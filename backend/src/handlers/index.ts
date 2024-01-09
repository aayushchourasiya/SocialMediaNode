type Executable = () => Promise<boolean>;

const handler = async (executables: Executable[] = []): Promise<void> => {
  if (!executables.length) {
    return;
  }
  for (let i = 0; i < executables.length; ) {
    const success = await executables[i]();
    if (success === true) {
      i++;
    } else {
      break;
    }
  }
};

const wrapperFunction = (input: Executable) => {
  return () => () => input;
};

module.exports = {
  handler,
  wrapperFunction,
};
