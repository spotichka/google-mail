import { mailAPI } from "../../api/mail-api";
import { useAppSelector } from "../../hooks/redux.ts";
import { Link, Outlet } from "react-router-dom";

const Mail = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const { data, isLoading } = mailAPI.useGetLabelsQuery(user?.id);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div style={{ display: "flex", gap: "15" }}>
      <div>
        {data?.labels &&
          data.labels.length &&
          data.labels.map((link) => (
            <div key={link.id}>
              <Link to={`/mail/${link.id}`}>{link.name}</Link>
            </div>
          ))}
      </div>
      <div>
        outlet
        <Outlet />
      </div>
    </div>
  );
};

export default Mail;
