import React, { useEffect, useState } from "react";
import styles from "../../sass/menuStyles.module.scss";
import { SupportedApps } from "./SupportedApps";
import { FilterBand } from "./FilterBand";
import { MenuItemCard } from "./MenuItemCard";
import { useSearchParams } from "react-router-dom";
import { fetchMenuItems } from "../../services/helper-functions/getMenuItems";
import { IMenuItem } from "../../services/helper-functions/interfaces";

export const Menu: React.FC = () => {
  // check if there is type search param or not, if not set it
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<IMenuItem[] | undefined>(
    new Array<IMenuItem>()
  );

  useEffect(() => {
    if (!searchParams.get("type")) {
      searchParams.set("type", "all");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  // fetch data whenever menu is loaded
  useEffect(() => {
    const controller = new AbortController();

    async function fetchMenuData() {
      const results: IMenuItem[] | undefined = await fetchMenuItems(
        controller.signal
      );
      console.log(results);

      setData(results);
    }

    fetchMenuData();

    // cleanup function
    return () => controller.abort();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <h1>our menu</h1>
        <p>
          We consider all the drivers of change gives you the components you
          need to change to create what you truly want to happen.
        </p>

        <FilterBand />
      </section>

      {/* section for items grid */}
      <section className={styles.items}>
        {data ? (
          data!.map((item, index) => {
            return <MenuItemCard key={index} itemData={item} />;
          })
        ) : (
          <div>loading data....</div>
        )}
      </section>

      <SupportedApps />
    </div>
  );
};
