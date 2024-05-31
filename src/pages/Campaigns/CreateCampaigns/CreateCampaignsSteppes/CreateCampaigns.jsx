import { Grid, Typography } from "@mui/material";
import React, { useContext, useMemo } from "react";
import Navigation from '../../../components/layout/Navigation/Index'
import Stepper from '../../../components/layout/Stepper/Index'


function CreateCampaigns() {
 
  return (
    <div className="w-full justify-center items-center create-campaign-page">
      <Navigation label={'createCampaign'} heading={'Create a Campaign'} />
      <Grid
        display={"flex"}
        justifyItems={"center"}
        justifyContent={"center"}
        className="pt-[176px] pb-[50px] max-desktop:pt-[60px] max-desktop:pb-[0px]"
      >
        <div className="w-[60%] flex justify-center items-center max-desktop:w-[94%]">
          <Stepper />
        </div>
      </Grid>
    </div>
  );
}

export default CreateCampaigns;