import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { RiArrowRightSFill } from "react-icons/ri";
import Badge from '@mui/material/Badge';
import { Link, useLocation } from "react-router-dom";
import { TbCaretRightFilled } from "react-icons/tb";

import {
  AdminIcon,
  BookIcon,
  PhoneIcon,
  PolicyIcon,
  SettingsIcon,
  TeamsIcon,
  DashboardIcon,
  LandingIcon,
  CategorysIcon,
  CausesIcon,
  CausesApprovalIcon,
  ScholarshipCausesIcon,
  ReportedIcon,
  WithdrawalsIcon,
  CampaignIcon,
  DonationIcon,
  UserIcon,
  ScholarshipsIcon,
  PagesIcon,
  PgSettingsIcon,
} from "../../../utils/Icons";
import { colors } from "../../../constants/theme";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";

const activeMenuStyles = {
  background: "#FFF4EB",
  borderLeft: "4px solid #FF5733",

  "& .MuiButtonBase-root .MuiListItemText-root .MuiTypography-root": {
    color: "#25272C",
    fontSize: 16,
    fontFamily: "Satoshi",
    fontWeight: 700,
  },
};

const activeSubMenuStyles = {
  background: "#E7A56F",
  width: "95%",
  "& .MuiButtonBase-root .MuiListItemText-root .MuiTypography-root": {
    color: "#25272C",
    fontSize: 16,
    fontFamily: "Satoshi",
    fontWeight: 700,
  },
};

let Icons = {
  TbCaretRightFilled: (isActive) => <TbCaretRightFilled isActive={isActive} />,
  PolicyIcon: (isActive) => <PolicyIcon isActive={isActive} />,
  PhoneIcon: (isActive) => <PhoneIcon isActive={isActive} />,
  SettingsIcon: (isActive) => <SettingsIcon isActive={isActive} />,
  BookIcon: (isActive) => <BookIcon isActive={isActive} />,
  AdminIcon: (isActive) => <AdminIcon isActive={isActive} />,
  TeamsIcon: (isActive) => <TeamsIcon isActive={isActive} />,
  LandingIcon: (isActive) => <LandingIcon isActive={isActive} />,
  CategorysIcon: (isActive) => <CategorysIcon isActive={isActive} />,
  CausesIcon: (isActive) => <CausesIcon isActive={isActive} />,
  CausesApprovalIcon: (isActive) => <CausesApprovalIcon isActive={isActive} />,
  ScholarshipCausesIcon: (isActive) => (
    <ScholarshipCausesIcon isActive={isActive} />
  ),
  ReportedIcon: (isActive) => <ReportedIcon isActive={isActive} />,
  CampaignIcon: (isActive) => <CampaignIcon isActive={isActive} />,
  WithdrawalsIcon: (isActive) => <WithdrawalsIcon isActive={isActive} />,
  DonationIcon: (isActive) => <DonationIcon isActive={isActive} />,
  UserIcon: (isActive) => <UserIcon isActive={isActive} />,
  ScholarshipsIcon: (isActive) => <ScholarshipsIcon isActive={isActive} />,
  PagesIcon: (isActive) => <PagesIcon isActive={isActive} />,
  PgSettingsIcon: (isActive) => <PgSettingsIcon isActive={isActive} />,
  DashboardIcon: (isActive) => <DashboardIcon isActive={isActive} />,
};

const CollapsibleMenuItem = ({
  item,
  index,
  selectedPath,
  setSelectedMenu,
}) => {
  const { pathname } = useLocation();

  return (
    <Box key={item.title + index}>
      <ListItem
        disablePadding
        sx={selectedPath.startsWith(item.path) ? activeMenuStyles : {}}
        onClick={() =>
          setSelectedMenu((prev) => (prev !== item.path ? item.path : ""))
        }
        key={item.title + index}
      >
        <ListItemButton className="pl-8 ">
          {item.icon && (
            <ListItemIcon sx={{ minWidth: "40px" }} className="pr-3">
              {item.icon &&
                (Icons[item.icon]
                  ? Icons[item.icon](selectedPath.startsWith(item.path))
                  : "")}
            </ListItemIcon>
          )}

          <ListItemText
            primary={item.title}
            primaryTypographyProps={{
              fontFamily: "satoshi",
              fontSize: 16,
              color: colors.text.main,
              fontWeight: 500,
            }}
          />
          {selectedPath.startsWith(item.path) ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </ListItemButton>
      </ListItem>
      
      <Collapse
        in={selectedPath.startsWith(item.path)}
        timeout="auto"
        unmountOnExit
        component="div"
      >
        <List component="div" className={`border-start  ps-2 py-0 ml-8`}>
          {item.children.map((subItem, index) =>
            subItem?.children ? (
              
              <CollapsibleMenuItem
                item={subItem}
                index={index}
                selectedPath={selectedPath}
                setSelectedMenu={setSelectedMenu}
              />
              
            ) : (
              <Link key={subItem.title} to={subItem.path}>
                <ListItem
                  disablePadding
                  sx={
                    pathname?.includes(subItem?.path) ? activeSubMenuStyles : {}
                  }
                  key={subItem.title}
                >
                  {subItem.path === pathname && (
                    <svg
                      width="4"
                      height="50"
                      viewBox="0 0 2 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="1"
                        y1="0.853027"
                        x2="0.999999"
                        y2="24.853"
                        stroke="#FF9F0A"
                        strokeWidth="2"
                      />
                    </svg>
                  )}

                  <ListItemButton className="pl-8">
                  
                    <RiArrowRightSFill className="text-[#B6BAC3]" />
                    <ListItemText
                      primary={subItem.title}
                      primaryTypographyProps={{
                        fontFamily: "satoshi",
                        fontWeight: 500,
                        fontSize: 16,
                        color: "#383A42",
                        paddingLeft: "1.5rem",
                      }}
                    />
                   
                  </ListItemButton>
                </ListItem>
              </Link>
            )
          )}
        </List>
      </Collapse>
    </Box>
  );
};

const DrawerBody = () => {

  let userData = localStorage.getItem("user_info");
  let Data = JSON.parse(userData);
  let role = Data?.user_role;

  const { pathname } = useLocation();

  const menus = role === 'Admin'
  ? [
      {
        icon: "DashboardIcon",
        path: "/AdminPanel/",
        title: "Dashboard",
      },
      {
        icon: "SettingsIcon",
        path: "/AdminPanel/General-Settings",
        title: "General Settings ",
        children: [
          {
            icon: "TbCaretRightFilled",
            path: "/AdminPanel/General-Settings/General",
            title: "General",
          },
          {
            path: "/AdminPanel/General-Settings/Limits",
            title: "Limits",
          },
          {
            path: "/AdminPanel/General-Settings/Profiles-Social",
            title: "Profiles Social",
          },
        ],
      },
      // Other Admin menus...
      {
        icon: "CategorysIcon",
        path: "/AdminPanel/Categories",
        title: "Categories",
      },
      {
        icon: "CausesIcon",
        path: "/AdminPanel/Campaigns",
        title: "Campaigns",
      },
      {
        icon: "CausesApprovalIcon",
        path: "/AdminPanel/Causes-Edit-Approval",
        title: "Campaign Edit Approval",
      },
      {
        icon: "ScholarshipCausesIcon",
        path: "/AdminPanel/Scholarship-Cause",
        title: "Scholarship Campaign",
      },
      {
        icon: "ReportedIcon",
        path: "/AdminPanel/Reported-Cause",
        title: "Reported Campaign",
      },
      {
        icon: "WithdrawalsIcon",
        path: "/AdminPanel/Withdrawals",
        title: "Withdrawals",
      },
      // Other Admin menus...
      {
        icon: "DonationIcon",
        path: "/AdminPanel/Donations",
        title: "Donations",
      },
      {
        icon: "UserIcon",
        path: "/AdminPanel/Users",
        title: "Users",
      },
      {
        icon: "ScholarshipsIcon",
        path: "/AdminPanel/Scholarships",
        title: "Scholarships",
      },
      {
        icon: "PagesIcon",
        path: "/AdminPanel/Pages",
        title: "Pages",
      },
      {
        icon: "PgSettingsIcon",
        path: "/AdminPanel/PG-Setting/PhonePe",
        title: "Payment Gateway",
      },
    ]
  : role === 'Campaign_Manager'
  ? [
      {
        icon: "CausesIcon",
        path: "/AdminPanel/Campaigns",
        title: "Campaigns",
      },
      {
        icon: "CausesApprovalIcon",
        path: "/AdminPanel/Causes-Edit-Approval",
        title: "Campaign Edit Approval",
      },
      {
        icon: "ReportedIcon",
        path: "/AdminPanel/Reported-Cause",
        title: "Reported Campaign",
      }
    ]
  : [
      {
        icon: "DonationIcon",
        path: "/AdminPanel/Donations",
        title: "Donations",
      },
      {
        icon: "WithdrawalsIcon",
        path: "/AdminPanel/Withdrawals",
        title: "Withdrawals",
      }
    ];



  const [selectedPath, setSelectedMenu] = useState("");

  useEffect(() => {
    setSelectedMenu(pathname);
  }, [pathname]);

  return (
    <div className="link-none transition-all duration-500 ease-in-out">
      <List
        // className="pt-4"
        sx={{
          "& .MuiListItem-root": {
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
          },
        }}
      >
        <div className="mx-3 my-2">
          <TextField
            sx={{
              width: "27ch",
              backgroundColor: "",
              "& .MuiInputBase-root input": {
                padding: 0,
              },
            }}
            InputProps={{
              startAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
            placeholder="Quick Find"
          ></TextField>
        </div>

        {menus?.length > 0 &&
          menus?.map((item, index) =>
            item?.children ? (
              <CollapsibleMenuItem
                item={item}
                index={index}
                selectedPath={selectedPath}
                setSelectedMenu={setSelectedMenu}
              />
            ) : (
              <Link to={item.path || "#"} key={item.title + index}>
                <ListItem
                  onClick={() => setSelectedMenu(item.path)}
                  className="mx-auto"
                  disablePadding
                  sx={item.path === selectedPath ? activeMenuStyles : {}}
                >
                  <ListItemButton className="pl-8">
                    <ListItemIcon sx={{ minWidth: "40px" }} className="pr-3">
                      {item.icon &&
                        (Icons[item.icon]
                          ? Icons[item.icon](item.path === selectedPath)
                          : "")}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{
                        fontFamily: "satoshi",
                        fontWeight: 500,
                        fontSize: 16,
                        color: "#717171",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            )
          )}
      </List>
    </div>
  );
};

export default DrawerBody;
