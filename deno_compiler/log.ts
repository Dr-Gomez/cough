export default function log(
  intro: string,
  header: string,
  btw: string,
  payload: string
) {
  return `${new Date().toUTCString()}: ${intro} [header: ${header}] ${btw} [payload: ${payload}].`;
}
