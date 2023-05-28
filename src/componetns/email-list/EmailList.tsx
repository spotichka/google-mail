import { useAppSelector } from "../../hooks/redux.ts";
import { useParams } from "react-router-dom";
import { useGetMailsQuery } from "../../api/mail-api.ts";
import EmailPreview from "../email-preview/EmailPreview.tsx";
import { useEffect, useState } from "react";
import { Button, List, Typography } from "antd";
import s from "./styles.module.css";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
const { Title } = Typography;

const EmailList = () => {
  const { label } = useParams<{ label: string }>();
  const { user } = useAppSelector((state) => state.userReducer);
  const [pageToken, setPageToken] = useState("");
  const [pageTokensArr, setPageTokensArr] = useState<string[]>([""]);
  const { data, isFetching, refetch } = useGetMailsQuery({
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

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Title level={2}>Your inbox</Title>
        <nav className={s.nav}>
          <Button
            type={"primary"}
            onClick={() => refetch()}
            icon={<ReloadOutlined />}
            shape={"circle"}
            loading={isFetching}
          />

          <Button
            type={"primary"}
            disabled={pageTokensArr.length <= 1}
            onClick={handleChangePrevPage}
          >
            <ArrowLeftOutlined /> Prev page
          </Button>
          <Button
            type={"primary"}
            disabled={!data?.nextPageToken}
            onClick={handleChangePage}
          >
            Next page <ArrowRightOutlined />
          </Button>
        </nav>
      </div>
      {data && data?.messages?.length && (
        <List
          dataSource={data.messages}
          renderItem={(item) => (
            <List.Item key={item.id} style={{ padding: 0 }}>
              <EmailPreview key={item.id} message={item} />
            </List.Item>
          )}
        />
      )}
      {!data?.messages && <div>No letter here</div>}
    </div>
  );
};

export default EmailList;
