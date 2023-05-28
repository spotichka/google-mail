import { IMessageResponse } from "../../types/MessageItem.ts";
import { Buffer } from "buffer";
import * as dayjs from "dayjs";
import { getEmailHeadersValue } from "../../helpers.ts";
import { useEffect, useState } from "react";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll.ts";
import s from "./styles.module.css";
import { Typography } from "antd";

type EmailPreviewBodyT = {
  emailData: IMessageResponse;
};

const { Title, Text } = Typography;
const EmailPreviewBody = ({ emailData }: EmailPreviewBodyT) => {
  const [body, setBody] = useState("");
  const [bodyFromParts, setBodyFromParts] = useState("");

  useLockBodyScroll();

  useEffect(() => {
    if (emailData.payload.body.data) {
      setBody(Buffer.from(emailData.payload.body.data, "base64").toString());
    }
  }, [emailData.payload.body]);

  useEffect(() => {
    if (
      emailData.payload.parts &&
      emailData.payload.parts.some(
        (item) => item.mimeType === "text/html" && item.body.data
      )
    ) {
      setBodyFromParts(
        Buffer.from(
          emailData.payload.parts.slice(-1).pop()?.body.data as string,
          "base64"
        ).toString()
      );
    }
  }, [emailData.payload.body]);

  return (
    <div className={s.wrapper}>
      <div className={s.info}>
        <Title level={2}>
          {getEmailHeadersValue(emailData.payload.headers, "Subject")}
        </Title>
        <Text>
          {dayjs(
            getEmailHeadersValue(emailData.payload.headers, "Date")
          ).format("HH:mm DD-MM-YYYY")}
        </Text>
        <div>
          <Text>From:</Text>
          <Text>
            {" "}
            {getEmailHeadersValue(emailData.payload.headers, "From")}
          </Text>
        </div>
        <div>
          <Text>Delivered to:</Text>
          <Text> {getEmailHeadersValue(emailData.payload.headers, "To")}</Text>
        </div>
      </div>

      {body || bodyFromParts ? (
        <iframe srcDoc={body || bodyFromParts} className={s.iframe} />
      ) : (
        <Title level={4}>Body is missing in this letter</Title>
      )}
    </div>
  );
};

export default EmailPreviewBody;
