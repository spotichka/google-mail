import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import { Outlet, useMatch, useNavigate, useParams } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import Loader from "../../componetns/loader/Loader.tsx";
import { mailAPI } from "../../api/mail-api";
import { Button, Layout, Menu, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { userSlice } from "../../store/reducers/userSlice.ts";
import s from "./styles.module.css";

const { Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;
const Mail = () => {
  const { label } = useParams<{ label: string }>();
  const isMatch = useMatch("/mail/:label");
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userReducer);
  const { data, isLoading } = mailAPI.useGetLabelsQuery(user?.id);
  const dispatch = useAppDispatch();

  const handleMenuSelect = ({ key }: { key: string }) => {
    navigate(`/mail/${key}`);
  };

  const handleLogOut = () => {
    googleLogout();
    dispatch(userSlice.actions.removeUser());
    localStorage.removeItem("token");
  };

  if (isLoading || !user?.id) {
    return <Loader />;
  }

  return (
    <Layout
      hasSider
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sider
        width={300}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          padding: "0px 10px",
        }}
      >
        <div className={s.aside}>
          <Title level={5} style={{ color: "white", margin: "20px 0 0 20px" }}>
            Your folders
          </Title>
          {data?.labels && (
            <Menu
              selectedKeys={[label as string]}
              onSelect={handleMenuSelect}
              theme={"dark"}
              items={
                data &&
                data.labels.map((link) => ({
                  key: link.id,
                  label: link.name,
                  title: link.name,
                  navigate: `/mail/${link.id}`,
                }))
              }
            />
          )}
          <div className={s.logoutNav}>
            <Text style={{ color: "white" }}>{user.email}</Text>
            <Button
              type={"primary"}
              shape={"circle"}
              icon={<LogoutOutlined />}
              onClick={handleLogOut}
            />
          </div>
        </div>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 300 }}>
        <Content>
          {isMatch ? (
            <Outlet />
          ) : (
            <Title level={3} className={s.noLabel}>
              Select folder to view letters
            </Title>
          )}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <Text>©2023 Created by Valentyn Poslavskyi</Text>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Mail;
