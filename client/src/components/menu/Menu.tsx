import React, { useEffect, useRef, useState } from "react";
import styles from "../../sass/menuStyles.module.scss";
import { SupportedApps } from "./SupportedApps";
import { FilterBand } from "./FilterBand";
import { MenuItemCard } from "./MenuItemCard";
import { useLocation, useSearchParams } from "react-router-dom";
import { fetchMenuItems } from "../../services/helper-functions/getMenuItems";
import {
  IMenuItem,
  paramsObjectType,
} from "../../services/helper-functions/interfaces";
import { Loader } from "../loader/Loader";
import { Modal } from "../modal/Modal";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

export const Menu: React.FC = () => {
  // check if there is type search param or not, if not set it
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<IMenuItem[]>(new Array<IMenuItem>());
  const appsRef = useRef<HTMLTableSectionElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);

  const { showFilterModal } = useSelector((state: RootState) => state.filter);
  const { showMenuItemModal } = useSelector(
    (state: RootState) => state.menuItem
  );

  const location = useLocation();

  // set location in local storage so that if we navigate to other components and return,
  // our url is persisted even after menu component unmounts
  useEffect(() => {
    localStorage.setItem("query", JSON.stringify(location.search));
  }, [location]);

  // console.log(page);

  useEffect(() => {
    if (!searchParams.get("type")) {
      searchParams.set("type", "all");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  // fetch data whenever menu is loaded
  // NOTE: whenever doing state updates in a useEffect hook, always use functional updates,
  // if you update without a function you will get stuck in an infinite loop
  // apply the above rule to updating state using previous state always
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // loop over entries
      entries.forEach((entry) => {
        if (entry.isIntersecting)
          setPage((prevPage) => {
            return prevPage + 1;
          });
      });
    });

    observer.observe(appsRef.current!);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    // retrieving searchParams
    const queryParamsObject: paramsObjectType = {
      sort: null,
      delivery: null,
      cuisines: null,
      explore: null,
      rating: null,
      veg: null,
      offer: null,
      cost: null,
      type: null,
      keyword: null,
    };

    if (searchParams.get("sort")) {
      queryParamsObject.sort = searchParams.get("sort");
    }

    if (searchParams.get("delivery")) {
      queryParamsObject.delivery = searchParams.get("delivery");
    }

    if (searchParams.get("cuisine")) {
      const val = searchParams.get("cuisine");
      let arr = new Array<string>();

      arr = val!.split(".");

      queryParamsObject.cuisines = arr;
    }

    if (searchParams.get("explore")) {
      const val = searchParams.get("explore");
      let arr = new Array<string>();

      arr = val!.split(".");

      queryParamsObject.explore = arr;
    }

    if (searchParams.get("rating")) {
      queryParamsObject.rating = Number(searchParams.get("rating"));
    }

    if (searchParams.get("veg")) {
      queryParamsObject.veg = Boolean(searchParams.get("veg"));
    }

    if (searchParams.get("offer")) {
      const val = searchParams.get("offer");
      let arr = new Array<string>();

      arr = val!.split(".");

      queryParamsObject.offer = arr;
    }

    if (searchParams.get("cost")) {
      queryParamsObject.cost = searchParams.get("rating");
    }

    if (searchParams.get("type")) {
      queryParamsObject.type = searchParams.get("type");
    }

    if (searchParams.get("key")) {
      queryParamsObject.keyword = searchParams.get("key");
    }

    async function fetchMenuData() {
      const results: IMenuItem[] | undefined = await fetchMenuItems(
        controller.signal,
        page,
        queryParamsObject
      );

      // if (results && results.length > 0) console.log(results);

      if (results) {
        setData((prevData) => {
          return [...prevData, ...results];
        });
        setIsLoading(false);
      }
    }

    if (page <= 10) fetchMenuData();

    // console.log("in useEffect hook to fetch");

    // cleanup function
    return () => controller.abort();
  }, [page, searchParams]);

  // this useEffect will trigger a rerender whenever searchParams changes
  // Q. find out the reason why setting page to -1 works
  useEffect(() => {
    // console.log("resetting ...");
    setData(new Array<IMenuItem>());
    setPage(-1);
  }, [searchParams]);

  return (
    <React.Fragment>
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
        {isLoading ? (
          <Loader />
        ) : (
          <section className={styles.items}>
            {data ? (
              data!.map((item, index) => {
                return (
                  // ref is like a variable that stores the reference and persists between renders,
                  // so if we keep reassigning components to same ref it'll hold the value of last ref
                  <MenuItemCard key={index} itemData={item} />
                );
              })
            ) : (
              <div>loading data....</div>
            )}
          </section>
        )}

        <SupportedApps appsRef={appsRef} />
      </div>

      {(showFilterModal || showMenuItemModal) && <Modal />}
    </React.Fragment>
  );
};
