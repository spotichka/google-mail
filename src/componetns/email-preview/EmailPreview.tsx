import { useState } from "react";
import CustomModal from "../modal/modal.tsx";
import EmailPreviewBody from "../email-peview-body/EmailPreview.tsx";
import { getEmailHeadersValue } from "../../helpers.ts";
import * as dayjs from "dayjs";
import { useGetMailQuery } from "../../api/mail-api.ts";
import { useAppSelector } from "../../hooks/redux.ts";
import { Skeleton } from "antd";
import { EyeOutlined, FieldTimeOutlined } from "@ant-design/icons";
import s from "./styles.module.css";

type EmailPreviewPropsT = {
  message: IEmailListItem;
};
const EmailPreview = ({ message }: EmailPreviewPropsT) => {
  const [isPreviewModalShown, setIsPreviewModalShown] = useState(false);
  const { user } = useAppSelector((state) => state.userReducer);
  const { data, isLoading } = useGetMailQuery({
    userId: user?.id,
    mailId: message.id,
  });

  if (isLoading || !data) {
    return <Skeleton />;
  }

  return (
    <>
      <div onClick={() => setIsPreviewModalShown(true)} className={s.wrapper}>
        <div className={s.label}>
          <EyeOutlined />
          {data && getEmailHeadersValue(data.payload.headers, "Subject")}
        </div>
        <div className={s.label}>
          <FieldTimeOutlined /> {dayjs(+data.internalDate).format("DD-MM-YYYY")}
        </div>
      </div>
      <CustomModal
        setModalShown={setIsPreviewModalShown}
        isShown={isPreviewModalShown}
      >
        <EmailPreviewBody emailData={data} />
      </CustomModal>
    </>
  );
};

export default EmailPreview;
