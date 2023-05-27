import { useAppSelector } from "../../hooks/redux.ts";
import { useParams } from "react-router-dom";
import { useGetMailsQuery } from "../../api/mail-api.ts";
import EmailPreview from "../email-preview/EmailPreview.tsx";
import { useEffect, useState } from "react";

const EmailList = () => {
  const { label } = useParams<{ label: string }>();

  const { user } = useAppSelector((state) => state.userReducer);
  const [pageToken, setPageToken] = useState("");
  const [pageTokensArr, setPageTokensArr] = useState<string[]>([""]);

  const { data, isFetching } = useGetMailsQuery({
    userId: user?.id,
    label: label as string,
    nextPageToken: pageToken,
  });

  const handleChangePage = () => {
    if (data?.nextPageToken) {
      setPageToken(data.nextPageToken);
      setPageTokensArr((prev) => [...prev, data.nextPageToken as string]);
    }
  };
  const handleChangePrevPage = () => {
    const prevToken = pageTokensArr?.[pageTokensArr.length - 2];
    if (prevToken) {
      setPageToken(prevToken);
      setPageTokensArr((prev) => prev.filter((item) => item !== pageToken));
    } else {
      setPageToken("");
      setPageTokensArr([""]);
    }
  };

  useEffect(() => {
    setPageTokensArr([""]);
  }, [label]);

  if (isFetching || !data) {
    return <div>Loading</div>;
  }

  return (
    <div>
      {data.messages &&
        data.messages.map((message) => (
          <EmailPreview key={message.id} message={message} />
        ))}
      <button
        disabled={pageTokensArr.length <= 1}
        onClick={handleChangePrevPage}
      >
        prev page
      </button>{" "}
      <button disabled={!data?.nextPageToken} onClick={handleChangePage}>
        next page
      </button>
    </div>
  );
};

export default EmailList;
