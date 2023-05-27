import { IMessageResponse } from "../../types/MessageItem.ts";
import { getEmailHeadersValue } from "../../helpers.ts";
import * as dayjs from "dayjs";
import { Buffer } from "buffer";
import { useEffect, useState } from "react";
type EmailPreviewBodyT = {
  emailData: IMessageResponse;
};
const EmailPreviewBody = ({ emailData }: EmailPreviewBodyT) => {
  const [body, setBody] = useState("");
  const [bodyFromParts, setBodyFromParts] = useState("");

  useEffect(() => {
    if (emailData.payload.body.data) {
      setBody(Buffer.from(emailData.payload.body.data, "base64").toString());
    }
  }, [emailData.payload.body]);

  useEffect(() => {
    if (
      emailData.payload.parts &&
      emailData.payload.parts.some((item) => item.body.data)
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
    <div style={{ height: 700, width: 800 }}>
      <div>
        Subject: {getEmailHeadersValue(emailData.payload.headers, "Subject")}
      </div>
      <div>Form: {getEmailHeadersValue(emailData.payload.headers, "From")}</div>
      <div>
        Delivered to:
        {getEmailHeadersValue(emailData.payload.headers, "To")}
      </div>
      <div>
        Time:
        {dayjs(getEmailHeadersValue(emailData.payload.headers, "Date")).format(
          "HH:mm DD-MM-YYYY"
        )}
      </div>
      <div
        style={{ overflow: "auto", maxHeight: 700, maxWidth: 800 }}
        dangerouslySetInnerHTML={{ __html: body || bodyFromParts }}
      />
    </div>
  );
};

export default EmailPreviewBody;
