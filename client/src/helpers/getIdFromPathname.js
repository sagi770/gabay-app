export default pathname => {
  const pathnameArr = pathname.split('/');

  return pathnameArr[pathnameArr.length - 1];
};
