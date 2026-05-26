import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../styles/dashboard.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { getResidents } from "../services/ResidentService";
import type { Resident } from "../types/ResidentType";

function Dashboard() {

  const [residents, setResidents] = useState<Resident[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getResidents();
      setResidents(data);
    };

    load();
  }, []);

  // save age parser
  const getAge = (r: Resident) => Number(r.age);

  
  // age chart data
  const ageData = [
    {
      ageGroup: "Under 16",
      count: residents.filter(r => getAge(r) < 16).length
    },
    {
      ageGroup: "16-24",
      count: residents.filter(r => getAge(r) >= 16 && getAge(r) <= 24).length
    },
    {
      ageGroup: "25-50",
      count: residents.filter(r => getAge(r) >= 25 && getAge(r) <= 50).length
    },
    {
      ageGroup: "60+",
      count: residents.filter(r => getAge(r) >= 60).length
    }
  ];

  // status calculations
  const total = residents.length;
  const voters = residents.filter(r => r.isRegisteredVoter).length;
  const nonVoters = total - voters;

  const voterPercent = total ? (voters / total) * 100 : 0;
  const nonVoterPercent = total ? (nonVoters / total) * 100 : 0;

  return (
    <Layout>
      <div className="dashboard">

        <h2 className="mainTitle">Dashboard</h2>

        {/* age chart */}
        <h3 className="title">Age Chart</h3>

        <div className="chartContainer">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageData}>
              <XAxis dataKey="ageGroup" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* status bars */}
        <h3 className="title">Status</h3>

        <div className="statusBars">

          {/* total */}
          <div className="statusRow">
            <span className="label">Total Residents</span>

            <div className="barBg">
              <div className="barFill total" style={{ width: "100%" }} />
            </div>

            <span className="value">{total}</span>
          </div>

          {/* voters */}
          <div className="statusRow">
            <span className="label">Eligible to Vote</span>

            <div className="barBg">
              <div
                className="barFill eligible"
                style={{ width: `${voterPercent}%` }}
              />
            </div>

            <span className="value">{voters}</span>
          </div>

          {/* non voters */}
          <div className="statusRow">
            <span className="label">Ineligible to Vote</span>

            <div className="barBg">
              <div
                className="barFill ineligible"
                style={{ width: `${nonVoterPercent}%` }}
              />
            </div>

            <span className="value">{nonVoters}</span>
          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;