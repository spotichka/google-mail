import { Spin, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const { Text } = Typography;
import s from "./styles.module.css";

const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

const Loader = () => {
  return (
    <div className={s.wrapper}>
      <Spin indicator={antIcon} />
      <Text className={s.text}>Loading...</Text>
    </div>
  );
};

export default Loader;
