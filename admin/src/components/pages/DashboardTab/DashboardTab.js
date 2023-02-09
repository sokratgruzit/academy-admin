import DonutChart from "./components/DonutChart/DonutChart";
import InfoItem from "./components/InfoItem/InfoItem";
import LineChart from "./components/LineChart/LineChart";
import RecentEnrolls from "./components/RecentEnrolls/RecentEnrolls";
import styles from "./DashboardTab.module.css";

function Courses() {
  console.log();
  return (
    <div>
      <div className={styles.info}>
        <InfoItem title={"students"} subTitle={"Number of Students"} data={6} />
        <InfoItem title={"Instructor"} subTitle={"Number of Instructor"} data={1} />
        <InfoItem title={"Subjects"} subTitle={"Number of Subjects"} data={2} />
        <InfoItem title={"Enrolled"} subTitle={"Number of Endolled"} data={3} />
        <InfoItem
          title={"Enrolled Amount"}
          subTitle={"Total Enrolled Amount"}
          data={"0.00"}
        />
        <InfoItem title={"Revenue"} subTitle={"Total Revenue"} data={"0.00"} />
        <InfoItem
          title={"Enrolled Today"}
          subTitle={"Total Enrolled Today"}
          data={"0.00"}
        />
        <InfoItem
          title={"This Month"}
          subTitle={"Total Enrolled This Month"}
          data={"0.00"}
        />
      </div>
      <div className={styles.charts}>
        <LineChart
          opposite={true}
          className={styles.chart50w}
          title="Monthly Income Stats for 2023"
          categories={[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ]}
          data={{
            name: "Income",
            data: [30, 40, 25, 50, 49, 21, 70, 51],
          }}
        />
        <LineChart
          opposite={true}
          className={styles.chart50w}
          title="Payment Statistics for February"
          categories={getDaysInMonth(new Date())}
          data={{
            name: "Income",
            data: [67, 20, 75, 27, 29, 21, 30, 39],
          }}
        />
      </div>
      <div className={styles.overviewSection}>
        <RecentEnrolls
          data={[
            {
              title: "40 questions to make you a virtual pub quiz master",
              instuctor: "Super admin",
              email: "eqiza99@gmail.com",
              price: "Free",
            },
            {
              title: "test course",
              instuctor: "Super admin",
              email: "eqiza99@gmail.com",
              price: "Free",
            },
            {
              title: "40 questions to make you a virtual pub quiz master",
              instuctor: "Super admin",
              email: "ali.pirievi.1@iliauni.edu.ge",
              price: "Free",
            },
          ]}
        />
        <div className={styles.donutsWrapper}>
          <DonutChart data={[44, 55]} labels={["Active", "Pending"]} />
          <DonutChart data={[34, 59, 48]} labels={["Courses", "Quizzes", "Classes"]} />
        </div>
      </div>
      <div>
        <LineChart
          title="Monthly Income Stats for 2023"
          categories={[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ]}
          data={{
            name: "Income",
            data: [30, 40, 25, 50, 49, 21, 70, 51],
          }}
        />
      </div>
    </div>
  );
}

export default Courses;

function getDaysInMonth(date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  const days = [];
  const lastDay = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= lastDay; day++) {
    const dayDate = new Date(year, month, day);
    days.push(dayDate.toLocaleString("default", { month: "short" }) + day);
  }
  return days;
}
