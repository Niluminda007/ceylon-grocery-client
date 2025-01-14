import { ExtendedOrder } from "@/types/order";
import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Button,
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";

interface OrderEmailProps {
  order: ExtendedOrder;
  party: "ADMIN" | "USER";
}

export const OrderEmail = ({ order, party }: OrderEmailProps) => {
  const previewText = `Order #${order.id} from ${order.user.firstName} ${order.user.lastName}`;
  const headingText =
    party === "ADMIN" ? "New Order Received" : "Thank you for your order";

  const invoiceUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/profile/orders/${order.id}/invoice`;

  const calculateDeliveryDate = (
    orderedDate: Date,
    deliveryDays: number
  ): string => {
    const deliveryDate = new Date(orderedDate.getTime());
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);

    return deliveryDate.toLocaleDateString();
  };

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
              width="50"
              height="50"
              alt="Ceylon Grocery"
            />
            <Text style={paragraph}>Ceylon Grocery</Text>
          </Section>
          <Section>
            <Text style={heading}>{headingText}</Text>
            <Row>
              <Column align="left">
                <Text style={paragraph}>
                  <strong>Order ID:</strong>
                </Text>
              </Column>
              <Column align="right">
                <Text style={paragraph}>{order.orderId}</Text>
              </Column>
            </Row>
            <Row>
              <Column align="left">
                <Text style={paragraph}>
                  <strong>Invoice Number:</strong>
                </Text>
              </Column>
              <Column align="right">
                <Text style={paragraph}>{order.invoice?.invoiceNumber}</Text>
              </Column>
            </Row>
            <Row>
              <Column align="left">
                <Text style={paragraph}>
                  <strong>Order Date:</strong>
                </Text>
              </Column>
              <Column align="right">
                <Text style={paragraph}>
                  {new Date(order.orderDate).toLocaleString()}
                </Text>
              </Column>
            </Row>
            <Row>
              <Column align="left">
                <Text style={paragraph}>
                  <strong>Status:</strong>
                </Text>
              </Column>
              <Column align="right">
                <Text style={paragraph}>{order.status}</Text>
              </Column>
            </Row>
            <Row>
              <Column align="left">
                <Text style={paragraph}>
                  <strong>Customer Name:</strong>
                </Text>
              </Column>
              <Column align="right">
                <Text style={paragraph}>
                  {order.user.name ||
                    `${order.user.firstName} ${order.user.lastName}`}
                </Text>
              </Column>
            </Row>
            <Row>
              <Column align="left">
                <Text style={paragraph}>
                  <strong>Email:</strong>
                </Text>
              </Column>
              <Column align="right">
                <Text style={paragraph}>{order.user.email}</Text>
              </Column>
            </Row>
            {party === "ADMIN" && (
              <Row>
                <Column align="left">
                  <Text style={paragraph}>
                    <strong>Delivery Date:</strong>
                  </Text>
                </Column>
                <Column align="right">
                  <Text style={paragraph}>
                    {calculateDeliveryDate(
                      order.orderDate,
                      order.deliveryOption ? order.deliveryOption.days : 0
                    )}
                  </Text>
                </Column>
              </Row>
            )}

            <Row>
              <Column align="left">
                <Text style={paragraph}>
                  <strong>Telephone:</strong>
                </Text>
              </Column>
              <Column align="right">
                <Text style={paragraph}>
                  {order.contactNumber || "Not provided"}
                </Text>
              </Column>
            </Row>
            <Row>
              <Column align="left">
                <Text style={paragraph}>
                  <strong>Delivery Address:</strong>
                </Text>
              </Column>
              <Column align="right">
                <Text style={paragraph}>
                  {order.address?.streetName}, {order.address?.buildingNumber},{" "}
                  {order.address?.city}, {order.address?.postalCode},{" "}
                  {order.address?.country}
                </Text>
              </Column>
            </Row>
            <Row>
              <Column align="left">
                <Text style={paragraph}>
                  <strong>Payment Method:</strong>
                </Text>
              </Column>
              <Column align="right">
                <Text style={paragraph}>
                  {order.paymentMethod?.method || "Not provided"}
                </Text>
              </Column>
            </Row>
          </Section>
          <Section>
            <Text style={heading}>Order Items</Text>
            {order.orderItems.map((item) => (
              <Row key={item.productId}>
                <Column align="left">
                  <Text style={paragraph}>
                    {item.quantity} x {item.productName} (SKU: {item.productSku}
                    )
                  </Text>
                </Column>
                <Column align="right">
                  <Text style={paragraph}>
                    €{item.unitPrice.toFixed(2)} each - Subtotal: €
                    {item.subTotal.toFixed(2)}
                  </Text>
                </Column>
              </Row>
            ))}
          </Section>
          <Section>
            <Text style={heading}>Order Summary</Text>
            <Row>
              <Column align="left">
                <Text style={paragraph}>
                  <strong>Subtotal:</strong>
                </Text>
              </Column>
              <Column align="right">
                <Text style={paragraph}>€{order.subtotal.toFixed(2)}</Text>
              </Column>
            </Row>
            <Row>
              <Column align="left">
                <Text style={paragraph}>
                  <strong>Total Discounts:</strong>
                </Text>
              </Column>
              <Column align="right">
                <Text style={paragraph}>
                  -€{order.totalDiscounts.toFixed(2)}
                </Text>
              </Column>
            </Row>
            <Row>
              <Column align="left">
                <Text style={paragraph}>
                  <strong>Delivery Fee:</strong>
                </Text>
              </Column>
              <Column align="right">
                <Text style={paragraph}>€{order.deliveryFee.toFixed(2)}</Text>
              </Column>
            </Row>
            <Row>
              <Column align="left">
                <Text style={paragraph}>
                  <strong>Total:</strong>
                </Text>
              </Column>
              <Column align="right">
                <Text style={paragraph}>€{order.total.toFixed(2)}</Text>
              </Column>
            </Row>
          </Section>
          <Section style={{ paddingBottom: "20px" }}>
            {party === "ADMIN" ? (
              <Button style={button} href={`mailto:${order.user.email}`}>
                Contact Customer
              </Button>
            ) : (
              <Button style={button} href={invoiceUrl}>
                Download Invoice
              </Button>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  maxWidth: "100%",
};

const heading = {
  fontSize: "24px",
  lineHeight: "1.4",
  fontWeight: "700",
  color: "#484848",
  marginBottom: "20px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#484848",
  marginBottom: "12px",
};

const button = {
  backgroundColor: "#0070f3",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  padding: "12px 20px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "auto",
  marginTop: "20px",
};
