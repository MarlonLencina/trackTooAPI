export interface sendEmailProps {
  email: string;
  name: string;
  link: string;
}
export interface IEmailProvider {
    sendEmail(data: sendEmailProps): Promise<void>;
  }
  