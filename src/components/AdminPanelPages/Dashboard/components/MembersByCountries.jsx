import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import React, { useState } from "react";
import { country } from "./constant/countries";

const MembersByCountries = () => {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  return (
    <>
      {/* <div className="rounded-lg shadow-lg"> */}

      <div>
        <p className={"mb-3 text-lg font-semibold"}>Members by Countries: </p>
        <VectorMap
          map={worldMill}
          containerStyle={{
            width: "90%",
            height: "70%",
          }}
          series={{
            regions: [
              {
                
                values: country.map((name) => name.user_count),
                
              },
            ],
          }}
          labels={country.map((name) => name.user_count)}
          
          backgroundColor="#ffffff"
          onRegionTipShow={function reginalTip(event, label, code) {
            return label.html(`
                    <div style="background-color: black; border-radius: 6px; min-height: 50px; width: 125px; color: white"; padding-left: 10px>
                      <p>
                      <b>
                      ${label.html()}
                      </b>
                      </p>
                      <p>
                      ${country.map((name) => name.user_count)}
                      </p>
                      </div>`);
          }}
          onMarkerTipShow={function markerTip(event, label, code) {
            return label.html(`
                    <div style="background-color: white; border-radius: 6px; min-height: 50px; width: 125px; color: black !important; padding-left: 10px>
                      <p style="color: black !important;">
                      <b>
                      ${label.html()}
                      </b>
                      </p>
                      </div>`);
          }}
        />
      </div>
      {/* </div> */}
    </>
  );
};

export default MembersByCountries;