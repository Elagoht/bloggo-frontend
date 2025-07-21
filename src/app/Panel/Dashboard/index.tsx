import { type ParentComponent } from "solid-js";

const Dashboard: ParentComponent = ({ children }) => {
  return (
    <>
      <section>deneme</section>

      <section>denememe</section>

      <section class="pie-charts"></section>

      <section class="horizontal-bar-charts"></section>

      <section class="total-counters"></section>

      <section class="average-metrics"></section>
    </>
  );
};

export default Dashboard;
