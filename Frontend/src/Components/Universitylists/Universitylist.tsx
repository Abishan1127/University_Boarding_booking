import React from "react";
import { Link } from "react-router-dom";

const universities = [
  { name: "Kelaniya", slug: "kelaniya" },
  { name: "SLIATE", slug: "sliate" },
  { name: "Colombo", slug: "colombo" },
  { name: "Peradeniya", slug: "peradeniya" },
  { name: "Jayewardenepura", slug: "jayawardenepura" },
  { name: "Ruhuna", slug: "ruhuna" },
  { name: "Moratuwa", slug: "moratuwa" },
  { name: "Jaffna", slug: "jaffna" },
  { name: "Wayamba", slug: "wayamba" },
  { name: "Sabaragamuwa", slug: "sabaragamuwa" },
  { name: "Eastern", slug: "eastern" },
  { name: "South Eastern", slug: "southEastern" },
];

const Universities: React.FC = () => {
  return (
    <div className="universities-container">
      <h2>Select a University</h2>
      <ul>
        {universities.map((uni) => (
          <li key={uni.slug}>
            <Link to={`/boarding-details/${uni.slug}`}>{uni.name} University</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Universities;
