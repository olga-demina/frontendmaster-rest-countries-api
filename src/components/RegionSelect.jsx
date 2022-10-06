const RegionSelect = ({ selectChange, selectedRegion }) => {
  const regions = [
    {
      name: "Africa",
      code: "africa",
    },
    {
      name: "America",
      code: "america",
    },
    {
      name: "Asia",
      code: "asia",
    },
    {
      name: "Europe",
      code: "europe",
    },
    {
      name: "Oceania",
      code: "oceania",
    },
  ];

  const regionsOptions = regions.map((region) => (
    <option key={region.code} value={region.code}>
      {region.name}
    </option>
  ));

  return (
    <div className="flex md:justify-end">
      <select className="px-4 py-2 rounded-md shadow-md bg-white" name="" id="" onChange={selectChange} value={selectedRegion ? selectedRegion : ""}>
        <option value="">All</option>
        {regionsOptions}
      </select>
    </div>
  );
};

export default RegionSelect;
