import { useState } from "react";
import { Anotacoes } from "../anotacoes";
import { Calendario } from "../calendario";

export function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      name: "Calendário",
      component: <Calendario />,
    },
    {
      name: "Anotações",
      component: <Anotacoes />,
    },
  ];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-start ">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`cursor-pointer ${
              activeTab === index
                ? "active text-blue-600 text-lg font-bold"
                : "text-cinza_escura hover:text-azul_claro_2 text-lg font-medium"
            }`}
            onClick={() => handleTabClick(index)}
          >
            <p>{tab.name}</p>
          </div>
        ))}
      </div>
      <div className="tab-content py-2">{tabs[activeTab].component}</div>
    </div>
  );
}
