import type { NextPage } from "next";
import { SomeTable } from "../components/SomeTable";
import { TablePropsProvider } from "../provider/TablePropsProvider";

const Home: NextPage = () => {
  return (
    <TablePropsProvider>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <SomeTable />
      </div>
    </TablePropsProvider>
  );
};

export default Home;
