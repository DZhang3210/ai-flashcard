import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface SuccessEmailProps {
  productName: string;
  amount: number;
  receiptUrl?: string;
}

export const SuccessEmail = ({
  productName,
  amount,
  receiptUrl,
}: SuccessEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your AI Flashcard subscription is active!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to AI Flashcard Premium!</Heading>

          <Section style={section}>
            <Text style={text}>
              Thank you for subscribing to {productName}! Your payment of $
              {(amount / 100).toFixed(2)} has been processed successfully.
            </Text>

            <Text style={text}>
              You now have access to all premium features including:
            </Text>

            <ul style={list}>
              <li>Unlimited AI-powered flashcard generation</li>
              <li>PDF document processing</li>
              <li>Advanced study analytics</li>
              <li>Priority support</li>
            </ul>
          </Section>

          <Hr style={hr} />

          {receiptUrl && (
            <Section style={section}>
              <Link href={receiptUrl} style={button}>
                View Receipt
              </Link>
            </Section>
          )}

          <Text style={footer}>
            If you have any questions, simply reply to this email. We're always
            here to help!
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  borderRadius: "8px",
  maxWidth: "600px",
};

const section = {
  padding: "24px",
};

const h1 = {
  color: "#484848",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.4",
  margin: "16px 0",
  textAlign: "center" as const,
};

const text = {
  color: "#484848",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const list = {
  color: "#484848",
  fontSize: "16px",
  lineHeight: "24px",
  marginLeft: "26px",
};

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "12px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#9BA2B0",
  fontSize: "14px",
  lineHeight: "24px",
  textAlign: "center" as const,
  marginTop: "32px",
};

export default SuccessEmail;
