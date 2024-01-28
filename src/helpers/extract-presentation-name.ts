export const getPresentationName = (name: string) => {
  if (!name) {
    return;
  }

  const upperCasePresentationName = name.trim().toUpperCase();

  const names = upperCasePresentationName.split(" ");

  const lastName = names[names.length - 1];

  const otherNames = names.slice(0, names.length - 1);

  const firstInitialsFromOtherNames = otherNames
    ?.map((name) => name.charAt(0))
    ?.join("");

  const presentationName = `${lastName}${
    firstInitialsFromOtherNames && `, ${firstInitialsFromOtherNames}`
  }`;

  return presentationName;
};
