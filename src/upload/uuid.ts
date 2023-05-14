const now = +new Date;
let index = 0;

export default function uuid() {
  return `upload-${now.toString(36)}-${++index}`;
}
