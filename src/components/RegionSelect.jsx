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
      <label htmlFor="select-region" className="sr-only">
        Select by region
      </label>
      <select
        id="select-region"
        className="px-4 py-2 rounded-md shadow-md bg-white focus-visible:outline-none"
        name=""
        onChange={selectChange}
        value={selectedRegion ? selectedRegion : ""}
      >
        <option value="">All</option>
        {regionsOptions}
      </select>
    </div>
  );
};

export default RegionSelect;
