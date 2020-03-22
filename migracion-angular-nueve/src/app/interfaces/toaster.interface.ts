export interface ToasterInterface {
  type?: 'info' | 'error' | 'warnming' | 'success';
  title: string;
  body: string;
}
