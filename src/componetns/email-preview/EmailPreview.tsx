import { useGetMailQuery } from "../../api/mail-api.ts";
import { useAppSelector } from "../../hooks/redux.ts";
import * as dayjs from "dayjs";
import { useState } from "react";
import CustomModal from "../modal/modal.tsx";
import EmailPreviewBody from "../email-peview-body/EmailPreview.tsx";
import { getEmailHeadersValue } from "../../helpers.ts";

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
    return <div>Loading</div>;
  }

  return (
    <>
      <div onClick={() => setIsPreviewModalShown(true)}>
        {data && getEmailHeadersValue(data.payload.headers, "Subject")}
        {dayjs(+data.internalDate).format("DD-MM-YYYY")}
        <CustomModal
          setModalShown={setIsPreviewModalShown}
          isShown={isPreviewModalShown}
        >
          <EmailPreviewBody emailData={data} />
        </CustomModal>
      </div>
    </>
  );
};

export default EmailPreview;
