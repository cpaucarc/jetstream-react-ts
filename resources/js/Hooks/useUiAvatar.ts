export default function useUiAvatar() {
  const url = 'https://ui-avatars.com/api/';
  const fontColor = 'fff';
  const bgColors = [
    'f94144',
    'f3722c',
    'f8961e',
    'f9844a',
    '90be6d',
    '43aa8b',
    '4d908e',
    '577590',
    '277da1',
  ];

  function generateAvatarURI(fullname: string): string {
    const name = shortName(fullname);
    const index = name.length % bgColors.length;
    const bgColor = bgColors[index];

    return `${url}?background=${bgColor}&color=${fontColor}&name=${fullname}`;
  }

  function shortName(fullname: string): string {
    const names = fullname.split(' ');

    if (names.length === 1) return names[0];

    const [firstName, lastName, ...oth] = names;
    return `${firstName} ${lastName}`;
  }

  return { generateAvatarURI };
}
