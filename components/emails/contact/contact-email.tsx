import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ContactEmailProps {
  customerName: string;
  customerEmail: string;
  customerMessage: string;
}

export const ContactEmail = ({
  customerName,
  customerEmail,
  customerMessage,
}: ContactEmailProps) => {
  const previewText = `Read ${customerName}'s message`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section>
            <Img
              src={
                "https://res.cloudinary.com/dij3i3ar9/image/upload/v1724936379/ceylon-grocery/assets/logo_uib41g.png"
              }
              width="30"
              height="30"
              alt="ceylon-grocery"
            />
          </Section>
          <Section></Section>
          <Section style={{ paddingBottom: "20px" }}>
            <Row>
              <Text style={heading}>{customerName} sent you a message</Text>
              <Text style={review}>{customerMessage}</Text>

              <Button style={button} href={`mailto:${customerEmail}`}>
                Reach out to the customer
              </Button>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  maxWidth: "100%",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
};

const review = {
  ...paragraph,
  padding: "24px",
  backgroundColor: "#f2f3f3",
  borderRadius: "4px",
};

const button = {
  backgroundColor: "rgba(0,0,0,.9)",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "18px",
  paddingTop: "19px",
  paddingBottom: "19px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
};
