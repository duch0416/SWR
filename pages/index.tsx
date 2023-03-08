import { useRefreshReports } from "modules/reports/useRefreshReport";
import type { NextPage } from "next";
import { SomeTable } from "../components/SomeTable";
import { TablePropsProvider } from "../provider/TablePropsProvider";

const Home: NextPage = () => {
  const refreshReports = useRefreshReports()

  return (
    <div>
      <div style={{ display: "flex", gap: 50 }}>
        <TablePropsProvider reportId="1">
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <SomeTable />
          </div>
        </TablePropsProvider>
        <TablePropsProvider reportId="2">
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <SomeTable />
          </div>
        </TablePropsProvider>
      </div>
      <button onClick={refreshReports}>refresh all</button>
    </div>
  );
};

export default Home;
