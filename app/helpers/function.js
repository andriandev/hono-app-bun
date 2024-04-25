export function resJSON({ statusCode = 200, data = null, ...props }) {
  const resData = { status: statusCode, ...props, data };

  return resData;
}
