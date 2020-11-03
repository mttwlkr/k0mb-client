import React, { useState, useEffect } from "react";
import { Mixpanel } from "../Mixpanel";

export const withFilter = (Component) => ({ raw, mixpanelInfo, ...props }) => {
  const { groupName, pageName } = mixpanelInfo;
  const mpLabel = `Filter ${pageName} (${groupName})`;

  const [data, setData] = useState(raw);
  const [isError, setIsError] = useState(false);
  const [stringFilters, setStringFilters] = useState({
    sport: null,
    region: null,
    isVerified: null,
    isBusinessAccount: null,
  });
  const [sortFilter, setSortFilter] = useState(null);
  const [trimFilter, setTrimFilter] = useState({
    amount: 0,
    side: "left",
  });

  const checkboxInit = data.reduce((acc, curr) => {
    if (!acc[curr.name]) {
      acc[curr.name] = true;
    }
    return acc;
  }, {});

  const checkboxOptions = data.map((page) => {
    return {
      display: page.name,
      value: page.name,
    };
  });

  const [checkboxFilters, setCheckboxFilter] = useState(checkboxInit);

  const handleStringFilter = (filter, value) => {
    const newState = {
      ...stringFilters,
      [filter]: value,
    };
    setStringFilters(newState);
    Mixpanel.track(`${mpLabel}: ${filter} - ${value}`, {
      type: filter,
      key: value,
      ...mixpanelInfo,
    });
  };

  const handleCheckboxFilter = (key) => {
    const newState = {
      ...checkboxFilters,
      [key]: !checkboxFilters[key],
    };
    setCheckboxFilter(newState);

    Mixpanel.track(`${mpLabel}: profile removed - ${key}`, {
      type: "profile",
      key: key,
      ...mixpanelInfo,
    });
  };

  const handleTrimFilter = ({ amount, side }) => {
    let newAmount;
    if (amount >= 0) {
      newAmount = amount;
    }

    if (amount === undefined || amount === null) {
      amount = trimFilter.amount;
    }
    const newState = Object.assign(
      {},
      { amount: newAmount },
      { side: side || trimFilter.side }
    );
    setTrimFilter(newState);
  };

  const updateState = () => {
    let newState = raw;

    if (Object.keys(stringFilters).some((filter) => filter !== null)) {
      newState = newState.filter((athlete) => {
        const passesAllFilters = Object.keys(stringFilters)
          .filter((key) => stringFilters[key] !== null)
          .every((key) => {
            if (typeof athlete[key] === "object") {
              return athlete[key].includes(stringFilters[key]);
            }
            return stringFilters[key] === athlete[key];
          });

        return passesAllFilters ? true : false;
      });
    }

    if (sortFilter !== null) {
      newState = newState.sort((a, b) => b[sortFilter] - a[sortFilter]);

      Mixpanel.track(`${mpLabel}: sort - ${sortFilter}`, {
        type: "sort",
        key: sortFilter,
        ...mixpanelInfo,
      });
    }

    if (trimFilter.side === "left") {
      newState = newState.slice(trimFilter.amount, newState.length);
    } else {
      newState = newState.slice(0, newState.length - trimFilter.amount);
    }

    if (
      Object.keys(checkboxFilters).some((key) => checkboxFilters[key] === false)
    ) {
      newState = newState.filter((page) => checkboxFilters[page.name]);
    }

    if (newState.length > 0) {
      setData(newState);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    updateState();
  }, [stringFilters]);

  useEffect(() => {
    updateState();
  }, [trimFilter]);

  useEffect(() => {
    updateState();
  }, [sortFilter]);

  useEffect(() => {
    updateState();
  }, [checkboxFilters]);

  const resetAllFilters = () => {
    Mixpanel.track("Reset All Filters", {
      ...mixpanelInfo,
    });
    setStringFilters({
      sport: null,
      region: null,
      isVerified: null,
      isBusinessAccount: null,
    });
    setSortFilter(null);
    setTrimFilter({
      amount: 0,
      side: "left",
    });
    setCheckboxFilter(checkboxInit);
  };

  return (
    <Component
      {...props}
      data={data}
      mixpanelInfo={mixpanelInfo}
      handleSortFilter={setSortFilter}
      handleTrimFilter={handleTrimFilter}
      handleStringFilter={handleStringFilter}
      trimState={{
        amount: trimFilter.amount,
        side: trimFilter.side,
      }}
      handleCheckboxFilter={handleCheckboxFilter}
      checkboxFilters={checkboxFilters}
      checkboxOptions={checkboxOptions}
      resetAllFilters={resetAllFilters}
      isError={isError} // todo - error handling
    />
  );
};
