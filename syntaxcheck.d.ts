declare module 'react' {
  export const useState: any;
  export const useMemo: any;
  export type ReactNode = any;
  const React: any;
  export default React;
}
declare module 'next/link' {
  const Link: any;
  export default Link;
}
declare module 'next/dynamic' {
  const dynamic: any;
  export default dynamic;
}
declare namespace JSX { interface IntrinsicElements { [elemName: string]: any; } }
