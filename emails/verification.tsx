import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface NotionMagicLinkEmailProps {
  firstName?: string;
  verificationCode?: string;
}

export const VerificationEmail = ({
  firstName = 'John',
  verificationCode = '000000',
}: NotionMagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>Verify your account with this code</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to Marble Investments, {firstName}</Heading>
        <Text style={{ ...text, marginBottom: '14px' }}>
          Use this verification code to complete your sign up:
        </Text>
        <code style={code}>{verificationCode}</code>
        <Text
          style={{
            ...text,
            color: '#ababab',
            marginTop: '14px',
            marginBottom: '16px',
          }}
        >
          If you didn&apos;t try to sign up, you can safely ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default VerificationEmail;

const main = {
  backgroundColor: '#ffffff',
};

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
};

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
};

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '17px',
  margin: '24px 0',
};

const code = {
  display: 'inline-block',
  padding: '16px 4.5%',
  width: '90.5%',
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
  border: '1px solid #eee',
  color: '#333',
  fontSize: '17px',
  marginBottom: '24px',
};
